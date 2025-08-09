import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmbeddingsService {
  private client: OpenAI;
  private model = 'text-embedding-3-small'; // 1536 dims

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // We avoid throwing here to keep app booting for non-embedding paths
      // but attempts to embed will fail with a descriptive error.
      return;
    }
    this.client = new OpenAI({ apiKey });
  }

  private ensureClient() {
    if (!this.client) {
      throw new Error('OPENAI_API_KEY is not set. Please configure it in your environment.');
    }
  }

  async embedText(text: string): Promise<number[]> {
    this.ensureClient();
    const res = await this.client.embeddings.create({
      model: this.model,
      input: text,
    });
    return res.data[0].embedding as unknown as number[];
  }

  async generateAndStoreInitiativeEmbedding(initiative: {
    id: string;
    title: string;
    description: string;
    theme?: string | null;
    context?: string | null;
    deliverable?: string | null;
    evaluationCriteria?: string | null;
  }) {
    const text = [
      initiative.title,
      initiative.description,
      initiative.theme,
      initiative.context,
      initiative.deliverable,
      initiative.evaluationCriteria,
    ]
      .filter(Boolean)
      .join('\n');

    if (!text) return; // nothing to embed

    try {
      const vector = await this.embedText(text);
      const vectorLiteral = `[${vector.join(',')}]`;
      await this.prisma.$executeRawUnsafe(
        'UPDATE "initiatives" SET "embedding" = $1::vector WHERE id = $2',
        vectorLiteral,
        initiative.id,
      );
    } catch (e) {
      // Swallow errors to avoid blocking flows; log in the future if needed
    }
  }

  async searchSimilarText(text: string, limit = 10) {
    const vector = await this.embedText(text);
    const vectorLiteral = `[${vector.join(',')}]`;
    // Return only id and distance to keep payload lean
    const rows = await this.prisma.$queryRawUnsafe<Array<{ id: string; distance: number }>>(
      `SELECT id, (embedding <-> $1::vector) AS distance
       FROM "initiatives"
       WHERE embedding IS NOT NULL
       ORDER BY embedding <-> $1::vector ASC
       LIMIT $2`,
      vectorLiteral,
      limit,
    );
    return rows;
  }

  async searchSimilarInitiatives(text: string, limit = 10) {
    const idsWithScores = await this.searchSimilarText(text, limit);
    if (!idsWithScores.length) return [];
    const ids = idsWithScores.map((r) => r.id);
    const initiatives = await this.prisma.initiative.findMany({
      where: { id: { in: ids } },
      include: { _count: { select: { likes: true, comments: true } } },
    });
    const map = new Map(initiatives.map((i) => [i.id, i]));
    // Preserve similarity order, attach distance
    return idsWithScores
      .map(({ id, distance }) => ({ distance, initiative: map.get(id) }))
      .filter((x) => x.initiative);
  }
}