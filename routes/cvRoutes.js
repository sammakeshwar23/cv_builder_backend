const express = require('express');
const router = express.Router();
const CV = require('../models/CV');
const auth = require('../middleware/auth');
const PDFDocument = require('pdfkit');
const stream = require('stream');
const puppeteer = require('puppeteer');
const path = require('path');
const generateTemplate1 = require('../templates/template1');
const generateTemplate2 = require('../templates/template2');
const generateTemplate3 = require('../templates/template3');

// Create new CV
router.post('/create', auth, async (req, res) => {
    try {
        const newCV = new CV({
            userId: req.user.id,
            ...req.body,
        });
        const savedCV = await newCV.save();
        res.status(201).json(savedCV);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Update CV
router.put('/:id', auth, async (req, res) => {
    try {
        const cv = await CV.findById(req.params.id);
        if (!cv) return res.status(404).json({ message: 'CV not found' });

        if (cv.userId.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not authorized' });

        Object.assign(cv, req.body);
        const updatedCV = await cv.save();
        res.json(updatedCV);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Get All CV 
router.get('/all', auth, async (req, res) => {
    try {
        const cvs = await CV.find({ userId: req.user.id });

        if (!cvs || cvs.length === 0) {
            return res.status(200).json({ message: 'No CVs found for this user.' });
        }

        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Get CV by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const cv = await CV.findById(req.params.id);
        if (!cv) return res.status(404).json({ message: 'CV not found' });

        if (cv.userId.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not authorized' });

        res.json(cv);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Delete CV
router.delete('/:id', auth, async (req, res) => {
    try {
        const cv = await CV.findById(req.params.id);
        if (!cv) return res.status(404).json({ message: 'CV not found' });

        if (cv.userId.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not authorized' });

        await CV.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'CV deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});


router.get('/:id/download', auth, async (req, res) => {
    try {
        const cv = await CV.findById(req.params.id);
        if (!cv) return res.status(404).json({ message: 'CV not found' });
        if (cv.userId.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not authorized' });

        const templateType = req.query.template || '1';
        let html;
        switch (templateType.toLowerCase()) {
            case '2':
            case 'layout2':
                html = generateTemplate2(cv);
                break;
            case '3':
            case 'layout3':
                html = generateTemplate3(cv);
                break;
            default:
                html = generateTemplate1(cv);
        }


        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=cv_${cv._id}.pdf`);
        res.send(pdfBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'PDF generation failed', error: err });
    }
});

router.get('/:id/generate-share-link', auth, async (req, res) => {
    const cvId = req.params.id;

    if (!cvId) {
        return res.status(400).json({ message: 'Invalid CV ID' });
    }

    try {
        const shareUrl = `https://share-link/share/${cvId}`;
        return res.status(200).json({ shareUrl });

    } catch (err) {
        console.error('Error generating share link:', err.message);
        return res.status(500).json({ message: 'Server error while generating share link' });
    }
});

router.post('/preview/:templateId', (req, res) => {
    const { templateId } = req.params;
    const cv = req.body;

    let html;
    switch (parseInt(templateId)) {
        case 1:
            html = generateTemplate1(cv);
            break;
        case 2:
            html = generateTemplate2(cv);
            break;
        case 3:
            html = generateTemplate3(cv);
            break;
        default:
            return res.status(400).json({ error: 'Invalid template ID' });
    }

    res.send(html);
});

router.patch('/:id/mark-paid', async(req, res) => {
    try {
        console.log("api call")
        const { id } = req.params;
        await CV.findByIdAndUpdate(id, { paid: true });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark CV as paid.' });
    }
});



module.exports = router;
