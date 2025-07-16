import Question from '../models/Question.js';

export const createQuestion = async (req, res) => {
  try {
    const q = await Question.create({
      module: req.body.moduleId,
      text: req.body.text,
      createdBy: req.user.id
    });
    res.status(201).json(q);
  } catch (err) {
    res.status(500).json({ error: 'Cannot create question' });
  }
};

export const getQuestionsByModule = async (req, res) => {
  try {
    const questions = await Question.find({ module: req.params.moduleId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
};
