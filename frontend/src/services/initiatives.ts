import api from "@/services/api";
import type { Initiative } from "@/types/initiative";

type GetInitiativesParams = {
  categories?: string[];
  statuses?: string[];
  sort?: string;
};

class InitiativesService {
  async getInitiatives(params?: GetInitiativesParams): Promise<Initiative[]> {
    const qp: any = {};
    if (params?.categories) qp.categories = params.categories.join(',');
    if (params?.statuses) qp.statuses = params.statuses.join(',');
    if (params?.sort) qp.sort = params.sort;

    const response = await api.get<Initiative[]>("/initiatives", { params: qp });
    return response.data;
  }

  async getInitiative(id: string): Promise<Initiative> {
    const response = await api.get<Initiative>(`/initiatives/${id}`);
    return response.data;
  }

  async getUserInitiatives(userId: string): Promise<Initiative[]> {
    const response = await api.get<Initiative[]>(`/initiatives/user/${userId}/authored`);
    return response.data;
  }

  async getUserManagedInitiatives(userId: string): Promise<Initiative[]> {
    const response = await api.get<Initiative[]>(`/initiatives/user/${userId}/assigned`);
    return response.data;
  }

  async likeInitiative(id: string, userId: string) {
    const response = await api.post(`/initiatives/${id}/like`, { userId });
    return response;
  }

  async unlikeInitiative(id: string, userId: string) {
    const response = await api.delete(`/initiatives/${id}/like`, { params: { userId } });
    return response;
  }

  async createComment(id: string, content: string, userId: string) {
    const response = await api.post(`/initiatives/${id}/comments`, { content, userId });
    return response;
  }

  async deleteComment(initiativeId: string, commentId: string, userId: string) {
    const response = await api.delete(`/initiatives/${initiativeId}/comments/${commentId}`, { params: { userId } });
    return response;
  }
}

export const initiativesService = new InitiativesService();
