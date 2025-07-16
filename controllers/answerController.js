import Answer from '../models/Answer.js';

export const submitAnswer = async (req, res) => {
  try {
    const answer = await Answer.create({
      question: req.body.questionId,
      student: req.user.id,
      response: req.body.response
    });
    res.status(201).json({ message: 'Answer submitted', answer });
  } catch (err) {
    res.status(500).json({ error: 'Submission failed' });
  }
};

export const getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate('student', 'name email');
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching answers' });
  }
};
