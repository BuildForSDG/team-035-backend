const MilestoneReport = require('../models/milestonesReport');

const milestoneReportList = (req, res) => {
  MilestoneReport.find()
    .populate('milestoneID')
    .exec()
    .then((milestoneReports) => {
      if (!milestoneReports) {
        return res.status(404).json({ message: 'milestoneReports not found!' });
      }
      return res.status(200).json(milestoneReports);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const milestoneReportReadOne = (req, res) => {
  const milestoneReportId = req.param.id;
  MilestoneReport.findById(milestoneReportId)
    .populate('milestoneID')
    .exec()
    .then((milestoneReport) => {
      if (!milestoneReport) {
        return res.status(404).json({ message: 'milestoneReport not found! ' });
      }
      return res.status(200).json({ milestoneReport });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};


const milestoneReportCreate = (req, res) => {
  MilestoneReport.create({
    // milestone: milestoneID._id,
    prof: req.body.prof
  })
    .then((milestoneReport) => res.status(201).json({ data: milestoneReport }))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const milestoneReportUpdate = (req, res) => {
  const milestoneReportid = req.param.id;
  if (!milestoneReportid) {
    return res.status(404).json({ message: 'milestoneReport not found!' });
  }
  return MilestoneReport.findByIdAndUpdate({
    milestoneReportid,
    $set: {
      proof: req.body.proof
    }
  })
    .then((milestoneReport) => res.status(200).json({
      message: 'Updated successfully!',
      data: milestoneReport
    }))
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

const milestoneReportDelete = (req, res) => {
  const milestoneReportId = req.param.id;
  if (!milestoneReportId) {
    return res.status(404).json({ message: 'milestoneReport not found!' });
  }
  return MilestoneReport.findByIdAndRemove(milestoneReportId)
    .then(() => res.status(200)
      .json({ message: 'successfully deleted the milestoneReport' }))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  milestoneReportList,
  milestoneReportReadOne,
  milestoneReportCreate,
  milestoneReportUpdate,
  milestoneReportDelete
};
