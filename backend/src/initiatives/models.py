from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Column, Integer, String
from src.db import Base


class Initiative(Base):
    __tablename__ = "initiatives"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=False)
    status = Column(String(50), nullable=False, default="proposed")


class InitiativeBase(BaseModel):
    title: str
    description: str
    status: Optional[str] = "proposed"

    class Config:
        from_attributes = True


class InitiativeCreate(InitiativeBase):
    pass


class InitiativeUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]

    class Config:
        from_attributes = True


class InitiativeInDB(InitiativeBase):
    id: int

    class Config:
        from_attributes = True


class InitiativeResponse(InitiativeInDB):
    pass
