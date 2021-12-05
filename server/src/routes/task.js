import { Router } from 'express'
import taskController from '../controllers/taskController'

const router = new Router()

router.get('/', taskController.show)
router.get('/:id', taskController.index)
router.post('/', taskController.store)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.delete)

router.put('/iscomplete/:id', taskController.isComplete)

export default router