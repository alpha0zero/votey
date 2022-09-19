import { prisma } from "../../db/prismaClient"
import type { Answer } from "@prisma/client"
import Nav from "../../components/Nav"

export default function Mypoll({answers}: {answers: Answer[]}) {

  return (
    <div>
      <Nav/>
      <pre>
        <code>
          {
            JSON.stringify(answers, null, 2)
          }
        </code>
      </pre>
    </div>
  )
}

export async function getServerSideProps ({params}: {params: {id: string}}) {

    try{
        const answers = await prisma.answer.findMany({
            where: {
                voteId: +params.id
            }
        })
        return {
          props: {
            answers
          }
        }
        
    }catch(err) {
        throw err
    }
}