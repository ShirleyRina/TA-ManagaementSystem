import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../services/faculty-job'; // Adjust this import based on your actual API file
import { UserContext } from '../../provider';

const EvaluatePerformance: React.FC = () => {
  // Type definition for performance evaluations
  type Performance = {
    id: number;
    employeeName: string;
    jobId: number;
    performanceMetrics: string;
    evaluation: string; // Textual evaluation
  };

  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }

  const [performances, setPerformances] = useState<Performance[]>([]);
  const [currentPerformance, setCurrentPerformance] =
    useState<Performance | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Replace with the actual API call
    api.getPerformances().then((res) => {
      if (res !== undefined) {
        setPerformances(res);
      }
    });
  }, []);

  const handleEditClick = (performance: Performance) => {
    setCurrentPerformance(performance);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveClick = () => {
    if (currentPerformance) {
      api
        .updatePerformance(currentPerformance.id, currentPerformance)
        .then((res) => {
          if (res !== undefined) {
            setPerformances(
              performances.map((perf) =>
                perf.id === currentPerformance.id ? res : perf
              )
            );
          }
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error('Error updating performance:', error);
          alert('Failed to update performance.');
        });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentPerformance({
      ...currentPerformance!,
      [name]: value,
    });
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom component="div">
          Performance Evaluations
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Job ID</TableCell>
                <TableCell>Performance Metrics</TableCell>
                <TableCell>Evaluation</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {performances.map((performance) => (
                <TableRow
                  key={performance.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {performance.employeeName}
                  </TableCell>
                  <TableCell>{performance.jobId}</TableCell>
                  <TableCell>{performance.performanceMetrics}</TableCell>
                  <TableCell>{performance.evaluation}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(performance)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="employeeName"
            label="Employee Name"
            type="text"
            fullWidth
            variant="standard"
            name="employeeName"
            value={currentPerformance?.employeeName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="performanceMetrics"
            label="Performance Metrics"
            type="text"
            fullWidth
            variant="standard"
            name="performanceMetrics"
            value={currentPerformance?.performanceMetrics}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="evaluation"
            label="Evaluation"
            type="text"
            fullWidth
            variant="standard"
            name="evaluation"
            value={currentPerformance?.evaluation}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EvaluatePerformance;
