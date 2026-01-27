import { useState } from 'react'

/**
 * @brief 显示单条统计数据
 */
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  // good 1分 neutral 0分 bad -1分
  const totalScore = good - bad;
  // 加入三目运算符判断，total要大于 0
  const average = total > 0 ? totalScore / total : 0;
  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given.
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average.toFixed(2)} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const Anecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0);

  // new 用于创建对象（实例）
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  // 找到 votes 中的最大值并返回其索引
  const maxVote = () => {
    if (votes.length === 0) return -1;
    const max = Math.max(...votes);
    return votes.indexOf(max);
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]} <br/>
      has {votes[selected]} votes.
      <br/>
      <Button onClick={() => {
        const newVotes = [...votes];
        newVotes[selected] = newVotes[selected] + 1;
        setVotes(newVotes);
      }} text="Vote it!" />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Next Anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVote()]} <br/>
      has {votes[maxVote()]} votes.
    </div>
  );
};

function App() {
  const [comments, setComments] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setComments({...comments, good: comments.good + 1})} text="Good"/>
      <Button onClick={() => setComments({...comments, neutral: comments.neutral + 1})} text="Neutral"/>
      <Button onClick={() => setComments({...comments, bad: comments.bad + 1})} text="Bad"/>
      <Statistics good={comments.good} neutral={comments.neutral} bad={comments.bad} />
      <hr />
      <Anecdotes />
    </div>
  )
}

export default App
