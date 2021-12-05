import Tasks from '../models/task'

class TaskController {
  
  async show(req, res) {    
    await Tasks.find({}, (err, response) => {
        if (err) return res.status(400).json({message: 'Ocorreu um erro ao listar as tasks'});
        return res.status(200).json(response)
    })
  }

  async index(req, res) {
    await Tasks.findById(req.params.id, (err, response) => {
        if (err) return res.status(400).json({message: 'Ocorreu um erro ao exibir uma task especifica'});
        return res.status(200).json(response)
    })
  }

  async store(req, res) {    
    await Tasks.create(req.body, (err, response) => {
        if (err) return res.status(400).json({message: 'Ocorreu um erro ao inserir uma task'});
        return res.status(201).json(response)
    })
  }

  async update ( req, res ) {
    await Tasks.updateOne({_id : req.params.id}, req.body, (err, response) => {
      if (err) return res.status(400).json({message: 'Ocorreu um erro ao atualizar a task'});

      Tasks.findById(req.params.id, (err, response) => {
        if (err) return res.status(400).json({message: 'Ocorreu um erro ao exibir uma task especifica'});
        return res.status(200).json(response)
      })
    })
  }

  async delete ( req, res ) {
    await Tasks.deleteOne({_id : req.params.id}, (err, response) => {
      if (err) return res.status(400).json({message: 'Ocorreu um erro'});
      return res.status(202).json(response)
    })
  }

  async isComplete( req, res ) {
    await Tasks.findByIdAndUpdate({ _id: req.params.id}, {isComplete: req.body.isComplete}, (err, response) => {
      if (err) return res.status(400).json({message: 'Ocorreu um erro ao atualizar a task'});
      return res.status(200).json({isComplete: req.body.isComplete})
    })
  }
}

export default new TaskController();