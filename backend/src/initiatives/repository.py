from src.initiatives.models import (
    Initiative,
    InitiativeCreate,
    InitiativeUpdate,
    InitiativeResponse,
)

from fastapi import HTTPException, status
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from typing import List


async def create_initiative(data: InitiativeCreate, db: AsyncSession):
    new_initiative = Initiative(
        title=data.title,
        description=data.description,
        status=data.status or "proposed",
    )
    db.add(new_initiative)
    await db.commit()
    await db.refresh(new_initiative)
    return InitiativeResponse.from_orm(new_initiative)


async def get_initiative(initiative_id: int, db: AsyncSession):
    result = await db.execute(select(Initiative).where(Initiative.id == initiative_id))
    initiative = result.scalar_one_or_none()
    if not initiative:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Initiative not found"
        )
    return InitiativeResponse.from_orm(initiative)


async def list_initiatives(db: AsyncSession) -> List[InitiativeResponse]:
    result = await db.execute(select(Initiative))
    initiatives = result.scalars().all()
    return [InitiativeResponse.from_orm(i) for i in initiatives]


async def update_initiative(
    initiative_id: int, data: InitiativeUpdate, db: AsyncSession
):
    result = await db.execute(select(Initiative).where(Initiative.id == initiative_id))
    initiative = result.scalar_one_or_none()
    if not initiative:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Initiative not found"
        )
    if data.title is not None:
        setattr(initiative, "title", data.title)
    if data.description is not None:
        setattr(initiative, "description", data.description)
    if data.status is not None:
        setattr(initiative, "status", data.status)
    db.add(initiative)
    await db.commit()
    await db.refresh(initiative)
    return InitiativeResponse.from_orm(initiative)


async def delete_initiative(initiative_id: int, db: AsyncSession):
    result = await db.execute(select(Initiative).where(Initiative.id == initiative_id))
    initiative = result.scalar_one_or_none()
    if not initiative:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Initiative not found"
        )
    await db.delete(initiative)
    await db.commit()
    return {"deleted": True, "id": initiative.id}
