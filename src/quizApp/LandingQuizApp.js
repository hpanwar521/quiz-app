import React, {useState,useRef} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button,Select,FormControl,TextField,MenuItem,InputLabel } from '@mui/material';
import './quizApp.css';


const customTheme = createTheme({
  palette : {
    mode : 'dark',
  }
});

const customTheme2 = createTheme({
  palette : {
    mode : 'light',
  }
});


const LandingQuizApp = () => {
  const [Name, setName] = useState('');
  const [error, setError] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [index, setIndex] = useState(0);
  const [Category, setCategory] = useState('');
  const [DifficultyLevel, setDifficultyLevel] = useState('');

  const [selectCategories,setSelectCategories] = useState( [
    {
      category: "General Knowledge",
      value: 9,
    },
    { category: "Books", value: 10 },
    { category: "Films", value: 11 },
    { category: "Music", value: 12 },
    { category: "Musicals and Theaters", value: 13 },
    { category: "Television", value: 14 },
    { category: "Video Games", value: 15 },
    { category: "Board Games", value: 16 },
    { category: "Science and Nature", value: 17 },
    { category: "Computer", value: 18 },
    { category: "Mathematics", value: 19 },
    { category: "Mythology", value: 20 },
    { category: "Sports", value: 21 },
    { category: "Geography", value: 22 },
    { category: "History", value: 23 },
    { category: "Politics", value: 24 },
    // { category: "Art", value: 25 },
    { category: "Celebrities", value: 26 },
    { category: "Animals", value: 27 },
    { category: "Vehicles", value: 28 },
    { category: "Comics", value: 29 },
    { category: "Gadgets", value: 30 },
    { category: "Japanese Anime", value: 31 },
    { category: "Cartoon and Animations", value: 32 },
  ]);
  const [selectDifficulty,setSelectDifficulty] = useState(['easy','medium','hard']);
  const [apiData, setApiData] = useState();
  const [CorrectOptionColor, setCorrectOptionColor] = useState(false);
  const [InCorrectOptionColor, setInCorrectOptionColor] = useState(false);
  const [Inx, setInx] = useState();
  const [score, setScore] = useState(0);





 const fatchQuestions = async (Category,DifficultyLevel) => {
 if(Category != '' && DifficultyLevel != ''){ let response = await fetch( `https://opentdb.com/api.php?amount=10${
    Category && `&category=${Category}`
  }${DifficultyLevel && `&difficulty=${DifficultyLevel}`}&type=multiple`);
  let data = await response.json();

  data && data.results && data.results.map((result,index)=>{
  let shuffledOptions = [result.correct_answer,...result.incorrect_answers];
  shuffledOptions = shuffledOptions.sort(() => Math.random() - 0.5);
  return  result.options = shuffledOptions;
  })
  
  setApiData(data.results);
  console.log(data);
  setError(false);
  setStartQuiz(true);
  

  }
  else{
  return setError(true);
  }

}


const checkOptionHandler = (e,option,apiData,score) => {
  console.log(apiData[index+1]?.correct_answer,score)
  if(index <= 9 && option == apiData[index]?.correct_answer){

    setCorrectOptionColor(true);
    setInCorrectOptionColor(false);
    setScore(score + 1);

     setTimeout(()=>{setCorrectOptionColor(false); setIndex(index+1)},1000) 

  }else{ 
    setInx(e.target.id)
    setCorrectOptionColor(false);
    setInCorrectOptionColor(true);
  
    if(index <= 9){
      setTimeout(()=>{setInCorrectOptionColor(false);setIndex(index+1)},1000) 
    }
  }
}

    return (<>
   { startQuiz == true ?  
      <ThemeProvider theme={customTheme}>
       
          <div>
            { index < 10 ?
            <>
            <div className='question-text'>Question {index + 1}</div>
                <div className='quiz-question-box'>
                  {apiData[index]?.question}
                  {apiData[index]?.options.map((option,indx)=>(
                    <div key={indx} className={`option ${indx}`} id={`${index}${indx}`} 
                    style={{backgroundColor : CorrectOptionColor && option == apiData[index].correct_answer ? 'green' 
                    : InCorrectOptionColor && Inx == `${index}${indx}` ? 'red' : ''}}
                    onClick={((e)=>{checkOptionHandler(e,option,apiData,score);})}
                    >
                      {option}
                    </div>
                  ))
                  }
            </div>
            </> : <div className='quiz-question-box'> Watch Your score is : {score}</div>
            }
           
          </div>

      <div>
      
        {index < 9 && <Button size="sm" onClick={()=>{setCorrectOptionColor(false); setInx(null); setIndex(index+1)}} className='next'>
          Next
        </Button>}
        {index == 10 && <Button size="sm"  className='see-score' onClick={()=>{setStartQuiz(false); setIndex(0); setScore(0)}}>
          start again
        </Button>}
      </div>
      </ThemeProvider>
 
   :
     <ThemeProvider theme={customTheme}>
      {error && <span className='error'>Please fill all required * fields</span>}
        {/* 
        <FormControl required sx={{ marginTop: 10, minWidth: 420}}>
     
        <TextField  label="Enter Name *" variant="outlined"   value={Name} onChange={(e)=> setName(e.target.value)}/>
      </FormControl> */}
        {/* category */}
      <FormControl required sx={{ marginTop: 20, minWidth: 420}}>
        <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={Category}
          label="Age *"
          onChange={(e)=> setCategory(e.target.value)}

        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selectCategories.map((item,indx)=>(
            <MenuItem key={indx} value={`${item.value}`}>{item.category}</MenuItem>
          )
          )}
          
        </Select>
        
      </FormControl>
      {/* difficult level */}
      <FormControl required sx={{ marginTop: 2, minWidth: 420}}>
        <InputLabel id="demo-simple-select-required-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={DifficultyLevel}
          label="Age *"
          onChange={(e)=> setDifficultyLevel(e.target.value)}

        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selectDifficulty.map((item,indx)=>(
             <MenuItem key={indx} value={item}>{item}</MenuItem>
          )
          )}
        </Select>
 
      </FormControl>
      <Button variant="contained" sx={{ marginTop: 2, minWidth: 420}} onClick={() =>fatchQuestions(Category,DifficultyLevel)}>Submit</Button>
      </ThemeProvider>
    
    }</>
    );
  }
  
  export default  LandingQuizApp;