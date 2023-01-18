import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {AiFillFileText} from "react-icons/ai"
import { Link } from '@mui/material';
import { Stack } from '@mui/material';


const exten =  (filename) => {
    return filename.substring(filename.lastIndexOf('.')+1, filename.length);
}
const isImage = (ext) => {
    if( exten(ext).match(/(jpg|jpeg|png|gif)$/i) ) return true;
    return false;
}

function ShowAttachments(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const attachments = props.attachments;
  const maxSteps = attachments.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {console.log(prevActiveStep);  return prevActiveStep + 1;   });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => { console.log(prevActiveStep);    return prevActiveStep - 1;});
  };

 
  

  return (
    <Box sx={{ width: 300, height:280, flexGrow: 1, marginTop:0  }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
      </Paper>
        <Box sx={{ maxHeight: 255, maxWidth: 700, p: 0 }}>
            {isImage(exten(attachments[activeStep])) ?  
        <Box sx={{ padding : 0}}>
          <Link href={`/api/public/files/tickets/${attachments[activeStep]}`} target="_blank" sx={{ color: theme.palette.secondary.main , fontSize: 18}}>
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 500,
                  overflow: 'hidden',
                  width: '100%',
                  padding:"0 0 0 0",
                }}
                src={`/api/public/files/tickets/${attachments[activeStep]}`}
                alt={attachments[activeStep]}
              />
          </Link>
        </Box>
        :
        <Box sx={{ bgcolor: theme.palette.primary.main  , height: 255,
            display: 'block',
            maxWidth: 500,
            overflow: 'hidden',
            width: '100%',
            }}>
                <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                  sx={{ marginTop: 8}}
                 >
                  <Link href={`/api/public/files/tickets/${attachments[activeStep]}`} target="_blank" sx={{ color: theme.palette.secondary.main , fontSize: 18}} >
                    <Stack 
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    >
                    <AiFillFileText color={theme.palette.secondary.main} size={50} sx={{cursor: 'pointer'}} />
                    Attachment #{activeStep+1}.{exten(attachments[activeStep])}
                  </Stack>

                  </Link>

                </Stack>
        </Box>
        }

      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
              <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default ShowAttachments;
