
const express = require("express");
const app = express();

app.use(express.json());

let leaves = [
    {
        id: 701,
        employeeName: "Ananya Singh",
        employeeCode: "EMP101",
        leaveType: "Casual",
        days: 2,
        status: "Pending"
    },
    {
        id: 702,
        employeeName: "Rahul Verma",
        employeeCode: "EMP102",
        leaveType: "Sick",
        days: 1,
        status: "Approved"
    },
    {
        id: 703,
        employeeName: "Simran Kaur",
        employeeCode: "EMP103",
        leaveType: "Earned",
        days: 3,
        status: "Rejected"
    }
];

app.get("/api/leaves", (req, res) => {
    res.status(200).json(leaves);
});

app.post("/api/leaves", (req, res) => {
    const newLeave = {
        id: leaves.length + 704,
        employeeName: req.body.employeeName,
        employeeCode: req.body.employeeCode,
        leaveType: req.body.leaveType,
        days: req.body.days,
        status: req.body.status
    };

    leaves.push(newLeave);

    res.status(201).json(newLeave);
});
app.get("/api/leaves/:id", (req, res) => {
    const id = Number(req.params.id);

    const leave = leaves.find(l => l.id === id);

    if (!leave) {
        return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json(leave);
});
app.put("/api/leaves/:id", (req, res) => {
    const id = Number(req.params.id);

    const leave = leaves.find(l => l.id === id);

    if (!leave) {
        return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = req.body.status;

    res.status(200).json(leave);
});
app.delete("/api/leaves/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = leaves.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Leave not found" });
    }

    const deletedLeave = leaves.splice(index, 1);

    res.status(200).json({
        message: "Leave deleted successfully",
        leave: deletedLeave[0]
    });
});
app.get("/api/leaves/status/:status", (req, res) => {
    const status = req.params.status;

    const filteredLeaves = leaves.filter(
        l => l.status.toLowerCase() === status.toLowerCase()
    );

    res.status(200).json(filteredLeaves);
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
