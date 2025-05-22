const CV = require('../models/CV');
const { generatePDF } = require('../utils/pdfGenerator');

exports.getAllCVs = async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user.id });
    res.json(cvs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCV = async (req, res) => {
  try {
    const newCV = new CV({ ...req.body, user: req.user.id });
    const saved = await newCV.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.updateCV = async (req, res) => {
  try {
    const updated = await CV.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteCV = async (req, res) => {
  try {
    await CV.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

exports.downloadCV = async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user: req.user.id });
    if (!cv) return res.status(404).json({ error: 'CV not found' });

    const pdfBuffer = await generatePDF(cv);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${cv.title || 'cv'}.pdf"`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: 'PDF generation failed' });
  }
};

exports.shareCV = async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user: req.user.id });
    if (!cv) return res.status(404).json({ error: 'CV not found' });

    const shareUrl = `https://cvbuilder.com/share/${cv._id}`;
    res.json({ shareUrl });
  } catch (err) {
    res.status(500).json({ error: 'Share failed' });
  }
};


