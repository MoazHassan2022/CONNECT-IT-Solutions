import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {AiFillFileText} from "react-icons/ai"
import { Link } from '@mui/material';
import { Stack } from '@mui/system';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
    console.log(theme);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {console.log(prevActiveStep);  return prevActiveStep + 1;   });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => { console.log(prevActiveStep);    return prevActiveStep - 1;});
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
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
        <Box sx={{ height: 255, maxWidth: 700, p: 2 }}>
            {isImage(exten(attachments[activeStep])) ?  
        <div>
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 500,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={`http://127.0.0.1:3000/files/tickets/${attachments[activeStep]}`}
                alt={attachments[activeStep]}
              />
        </div>
        :
        <Box sx={{ bgcolor: theme.palette.primary.main  , height: 255,
            display: 'block',
            maxWidth: 500,
            overflow: 'hidden',
            width: '100%',
            
            }}>
                <Stack direction="column"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={2}
                  sx={{ marginTop: 6}}

                 >
                    <AiFillFileText color={theme.palette.secondary.main} size={40} sx={{cursor: 'pointer'}} />
                    <Link href={`http://127.0.0.1:3000/files/tickets/${attachments[activeStep]}`} target="_blank" sx={{ color: theme.palette.secondary.main}}>Attachment #{activeStep+1}.{exten(attachments[activeStep])}</Link>
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
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default ShowAttachments;
