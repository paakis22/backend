import Module from '../models/Module.js';

export const createModule = async (req, res) => {
  try {
    const mod = await Module.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id ,
        pdf: {
    url: String,
    public_id: String
  }
}, { timestamps: true });

    res.status(201).json(mod);
  } catch (err) {
    res.status(500).json({ error: 'Cannot create module' });
  }
};



export const getModules = async (req, res) => {
  try {
    const mods = await Module.find().populate('createdBy', 'name email');
    res.json(mods);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching modules' });
  }
};
