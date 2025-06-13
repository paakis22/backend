import Classroom from '../models/Classroom.js';

export const createClass = async (req, res) => {
  try {
    const newClass = await Classroom.create({
      title: req.body.title,
      description: req.body.description,
      teacher: req.user.id,
      duration: req.body.duration,
      image: req.file
        ? {
            url: req.file.path,
            public_id: req.file.filename,
          }
        : undefined,
    });

    res.status(201).json(newClass);
  } catch (err) {
    console.error("🔥 Error creating class:", err);
    res.status(500).json({ error: 'Cannot create class' });
  }
};



export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classroom.find().populate('teacher', 'name email');
    res.json(classes);
  } catch (err) {
    console.error("🔥 Get All Classes Error:", err);
    res.status(500).json({ error: 'Error fetching classes' });
  }
};

export const getClassById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id).populate('students teacher');
    if (!classroom) return res.status(404).json({ error: 'Class not found' });
    res.json(classroom);
  } catch (err) {
    console.error("🔥 Get Class By ID Error:", err);
    res.status(500).json({ error: 'Error fetching class' });
  }
};

export const joinClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    if (!classroom.students.includes(req.user.id)) {
      classroom.students.push(req.user.id);
      await classroom.save();
    }

    res.json({ message: 'Joined class successfully' });
  } catch (err) {
    console.error("🔥 Join Class Error:", err);
    res.status(500).json({ error: 'Could not join class' });
  }
};

export const updateClassroom = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    // Authorization: Admin or teacher of the class
    if (req.user.role !== 'admin' && classroom.teacher?.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this classroom' });
    }

    // Update fields only if provided
    classroom.title = title || classroom.title;
    classroom.description = description || classroom.description;
    if (req.file) classroom.Image = req.file?.path; // Update image if provided

    await classroom.save();

    res.status(200).json({ message: 'Classroom updated successfully', classroom });
  } catch (error) {
    console.error("🔥 Update Classroom Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteClassroom = async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    // Authorization: Admin or teacher of the class
    if (req.user.role !== 'admin' && classroom.teacher?.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this classroom' });
    }

    await Classroom.findByIdAndDelete(id);
    res.status(200).json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    console.error("🔥 Delete Classroom Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
