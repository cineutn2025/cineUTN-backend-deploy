import { Request, Response, NextFunction } from "express"
import { Buy } from "./buy.entity.js"
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizeBuyInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    tipo: req.body.tipo, //Agregué un atributo para hacer una prueba
    //user: req.body.user

  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const buys = await em.find(Buy, {}) // {populate: ['user']}
    res.status(200).json({ message: 'Found all buys', data: buys })
  } catch (error: any) {
    res.status(500).json({ 
      message: 'An error occurred while querying all buys',
      error: error.message, })
  }
}


async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const buy = await em.findOneOrFail(Buy, { id })
    res.status(200).json({ message: 'Found buy', data: buy })
  } catch (error: any) {
    res.status(500).json({ message: 'An error occurred while querying the buy', error: error.message, })
  }
}


async function add(req: Request, res: Response) {
  try {
    const buy = em.create(Buy, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'Buy created', data: buy })
  } catch (error: any) {
    res.status(500).json({ 
      message: 'An error occurred while adding the buy', 
      error: error.message, })
  }
}


async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const buyToUpdate = await em.findOneOrFail(Buy, { id })
    em.assign(buyToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Buy updated', data: buyToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}



async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const buyToRemove = em.getReference(Buy, id);
    const buy = await em.findOne(Buy, { id });
    if (buy === null) {
      res.status(404).json({ message: 'Buy not found for deletion.' });
    } else {
      await em.removeAndFlush(buyToRemove);
      res.status(204).send({ message: 'Buy deleted' });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'An error occurred while deleting the buy',
      error: error.message,
    });
  }
}

export { sanitizeBuyInput, findAll, findOne, add, update, remove }