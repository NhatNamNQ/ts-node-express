import type { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database.js';
import { Item } from '../entities/Item.js';

const itemRepo = AppDataSource.getRepository(Item);

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const newItem = itemRepo.create({ name });
    const savedItem = await itemRepo.save(newItem);
    res.status(201).json(savedItem);
  } catch (error) {
    next(error);
  }
};

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const items = await itemRepo.find();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const item = await itemRepo.findOne({ where: { id: Number(id) } });
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const item = await itemRepo.findOne({ where: { id: Number(id) } });
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    await itemRepo.remove(item);
    res.status(204).json({ message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const item = await itemRepo.findOne({ where: { id: Number(id) } });
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    item.name = name;
    await itemRepo.save(item);
    res.json(item);
  } catch (error) {
    next(error);
  }
};
