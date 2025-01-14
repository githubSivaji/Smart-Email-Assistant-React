import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setErrors("")
    try
    {
      const response= await axios.post("http://localhost:8080/api/email/generate"
        ,
        {
          emailContent,tone
        }
      )
      setGeneratedReply(typeof response.data==='string'? response.data:JSON.stringify(response.data))

    }
    catch(error)
    {
      setErrors("Fail to generate Email reply try again....")
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Email Reply Generator
        </Typography>
        <Box sx={{ mx: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              label="Tone (Optional)"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Friendly">Friendly</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
          >
            {loading ? <CircularProgress size={25} /> : 'Generate Reply'}
          </Button>
        </Box>

        {errors && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors}
          </Typography>
        )}

        {generatedReply && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Generated Reply:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={generatedReply}
              inputProps={{ readOnly: true }}
            />
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigator.clipboard.writeText(generatedReply)}
            >
              Copy to clipboard
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
