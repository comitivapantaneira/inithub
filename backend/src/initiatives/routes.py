from src.db import get_db
from src.initiatives.models import (
    InitiativeCreate,
    InitiativeUpdate,
    InitiativeResponse,
)
from src.initiatives.repository import (
    create_initiative,
    get_initiative,
    list_initiatives,
    update_initiative,
    delete_initiative,
)

from fastapi import APIRouter, Depends, status

from typing import List

router = APIRouter(prefix="/api/v1/initiatives", tags=["Initiatives"])


@router.post(
    "/", response_model=InitiativeResponse, status_code=status.HTTP_201_CREATED
)
async def create(data: InitiativeCreate, db=Depends(get_db)):
    return await create_initiative(data, db)


@router.get("/{initiative_id}", response_model=InitiativeResponse)
async def read(initiative_id: int, db=Depends(get_db)):
    return await get_initiative(initiative_id, db)


@router.get("/", response_model=List[InitiativeResponse])
async def list_all(db=Depends(get_db)):
    return await list_initiatives(db)


@router.put("/{initiative_id}", response_model=InitiativeResponse)
async def update(initiative_id: int, data: InitiativeUpdate, db=Depends(get_db)):
    return await update_initiative(initiative_id, data, db)


@router.delete("/{initiative_id}", status_code=status.HTTP_200_OK)
async def delete(initiative_id: int, db=Depends(get_db)):
    return await delete_initiative(initiative_id, db)
