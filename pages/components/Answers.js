const Answers = ({ answers, selectAnswer }) => {

    return (
        <div className='lowerMain'>
            {answers && answers.map((answer, i) => {
                return (
                    <div key={i} onClick={() => selectAnswer(answer)} className='answerBox'><b>{answer}</b></div>
                )
            })}         
        </div>
    )
}

export default Answers

/*

<div onClick={() => selectAnswer(answers[0])} className='answerBox'><b>{answers && answers[0]}</b></div>
<div onClick={() => selectAnswer(answers[1])} className='answerBox'><b>{answers && answers[1]}</b></div>
<div onClick={() => selectAnswer(answers[2])} className='answerBox'><b>{answers && answers[2]}</b></div>
<div onClick={() => selectAnswer(answers[3])} className='answerBox'><b>{answers && answers[3]}</b></div> 

*/