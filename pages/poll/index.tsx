import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import type { Answer } from "@prisma/client"
import Nav from "../../components/Nav";
import Loader from "../../components/Loader";


type Status = "unloaded" | "loading" | "loaded"

const Poll: NextPage = () => {
  const router = useRouter()
  const [numans, setNumans] = useState<number>(2);
  const [question, setQuestion] = useState<string>("")
  const [answers, setAnswers] = useState({})
  const [pollStatus, setPollStatus] = useState<Status>("unloaded")

  //a function to be sure that our answers array length is not less than 2 answers
  const interval = (e: any) => {
    e.target.value = +e.target.value < 2 ? 2 : e.target.value
    setNumans(+e.target.value)
  };

  // we're simply logging the question and the answers
  const hundleSubmit = async (e: FormEvent<EventTarget>) => {

    const values: Answer[] = Object.values(answers)

    const poll = {
      question,
      answers: values
    }

    e.preventDefault();

    setPollStatus("loading")
    const {data} = await axios.post('/api/poll', poll)

    setPollStatus("loaded")
    console.log(data)
    router.push(`/poll/${data.vote.id}`)
  }

  return (
    <>
      <Nav/>
      <div className="h-full flex justify-center items-center">
        <form onSubmit={hundleSubmit} className="flex flex-col border border-slate-600 rounded-3xl sm:w-2/4 sm:h-2/4 p-8 m-8">
          <>
            <label htmlFor="question">
              <span className="text-xl">what is your question?</span>
              <input
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
                name="question"
                type="text"
                id="question"
                onChange={e => setQuestion(e.target.value)}
              />
            </label>

            <label htmlFor="num">
              <span className="text-xl">
                how many answers you want to create?
              </span>
              <input
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
                type="number"
                name="num"
                id="num"
                onBlur={interval}
                onChange={interval}
              />
            </label>
            {new Array(numans).fill(1).map((_, i) => (
                <label key={`answer${i + 1}`} htmlFor={`answer${i + 1}`}>
                  <span className="text-xl">{`answer${i + 1}:`}</span>
                  <input
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
                    type="text"
                    id={`answer${i + 1}`}
                    onChange={e => setAnswers({...answers, [`answer${i + 1}`]: {answer:e.target.value, votes: 0}})}
                  />
                </label>
            ))}
            <button
              className="my-2 py-2 px-4 bg-yellow-300 hover:bg-white rounded-lg"
              type="submit"
            >
              {
                pollStatus === "loading" ? <Loader/> : "create Poll"
              }
            </button>
          </>
        </form>
      </div>
    </>
  );
};

export default Poll;
