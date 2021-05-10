import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  margin: 0 0.2em;

  &:last-of-type {
    margin-right: 0.6em;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const StyledButton = styled(Button)`
  width: 60px;
`;

const ContentPaper = styled(Paper)`
  padding: 2em;
`;

const Body = () => {
  const [queryType, setQueryType] = useState('');
  const [messages, setMessages] = useState(['asdf', 'asd', 'asdf']);

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  return (
    <Wrapper>
      <Row>
        <StyledTextField placeholder="Name" />
        <StyledTextField placeholder="Subject" style={{ width: 240 }} />
        <StyledTextField placeholder="Score" />
        <StyledButton variant="contained" color="primary">
          Add
        </StyledButton>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel value="name" control={<Radio />} label="Name" />
              <FormControlLabel
                value="subject"
                control={<Radio />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <StyledTextField placeholder="Query string..." style={{ flex: 1 }} />
        <StyledButton variant="contained" color="primary">
          Query
        </StyledButton>
      </Row>
      <ContentPaper variant="outlined">
        {messages.map((m) => (
          <Typography variant="body2">{m}</Typography>
        ))}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
