import { prisma } from "../../db/prismaClient"
import type { Answer } from "@prisma/client"

export default function Mypoll({answers}: {answers: Answer[]}) {

  return (
    <div>
      <code>
        {
          JSON.stringify(answers, null, 2)
        }
      </code>
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
        
    }catch(err: any) {
        throw new Error(err)
    }
}