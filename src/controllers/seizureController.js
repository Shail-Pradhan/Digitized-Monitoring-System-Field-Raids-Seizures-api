import Seizure from '../models/seizureModel.js';

// Create a new seizure
export const createSeizure = async (req, res) => {
    try {
        const seizure = new Seizure(req.body);
        await seizure.save();
        res.status(201).json(seizure);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Add a seizure memo (image/pdf upload)
export const addSeizureMemo = async (req, res) => {
    try {
        const seizure = await Seizure.findById(req.params.id);
        if (!seizure) return res.status(404).json({ error: 'Seizure not found' });

        // Save the relative URL to the uploaded file
        const imageUrl = `/uploads/${req.file.filename}`;

        seizure.seizureMemos.push({
            imageUrl,
            uploadedAt: new Date()
        });

        await seizure.save();
        res.status(200).json(seizure);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get all seizures with basic filtering
export const getSeizures = async (req, res) => {
    try {
        const filter = {};
        // Example: filter by type or date
        if (req.query.type) filter.type = req.query.type;
        if (req.query.date) filter.date = req.query.date;
        const seizures = await Seizure.find(filter);
        res.json(seizures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single seizure by ID
export const getSeizureById = async (req, res) => {
    try {
        const seizure = await Seizure.findById(req.params.id);
        if (!seizure) return res.status(404).json({ error: 'Seizure not found' });
        res.json(seizure);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a seizure
export const updateSeizure = async (req, res) => {
    try {
        const seizure = await Seizure.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!seizure) return res.status(404).json({ error: 'Seizure not found' });
        res.json(seizure);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a seizure
export const deleteSeizure = async (req, res) => {
    try {
        const seizure = await Seizure.findByIdAndDelete(req.params.id);
        if (!seizure) return res.status(404).json({ error: 'Seizure not found' });
        res.json({ message: 'Seizure deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};