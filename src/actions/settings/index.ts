'use server'
import { client } from "@/lib/prisma"
import { clerkClient, currentUser } from "@clerk/nextjs"
import { usedDynamicAPIs } from "next/dist/server/app-render/dynamic-rendering";
import { string } from "zod";


export const onIntegrateDomain = async(domain: string, icon: string) => {
  const user = await currentUser();
  
  if(!user) return
  try{
     const subscription = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          }
        },
        subscription: {
          select: {
            plan: true,
          }
        }
      }
    })

    const domainExists = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains:{
          some: {
            name: domain
          }
        }
      }
    })

    if(!domainExists){
      if((subscription?.subscription?.plan == "STANDARD" && subscription._count.domains<1) || 
         (subscription?.subscription?.plan == "PRO" && subscription._count.domains<5)      ||
         (subscription?.subscription?.plan == "ULTIMATE" && subscription._count.domains<10)
    ){
    const newDomain = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        domains: {
          create: {
            name: domain,icon,
            chatBot: {
              create: {
                welcomeMessage: "Hey there, Let me know if you have any queries",
              },
            }
           }
         }
       }
     });
     if(newDomain){
      return {status: 200, message: "Domain successfully added"}
     }
    }
    return {
      status:400, message: "You've reached thhe maximum number of domains, upgrade your plan"
    }
    }
  }catch(error){

  }
}
export const onGetSubscriptionPlan = async () => {

       try{
          const user = await currentUser()
          if(!user) return

          const plan = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                subscription: {
                    select: {
                        plan: true
                    },
                },
            },
          })

          if(plan){
            return plan.subscription?.plan
          }
       }catch(error){
            console.log(error)
       }
}

export const onGetAllAccountDomains = async () => {
  const user = await currentUser()
  if (!user) return
  try {
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return { ...domains }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdatePassword = async ( password: string) => {
  
   try{
    const user = await currentUser()

    if(!user) return null
    const update = await clerkClient.users.updateUser(user.id, {password})
    if(update){
      return {status: 200, message: 'Password Updated'}
    }
   }catch(error){
    console.log(error)
    return {status: 400}
   }
}

export const onGetCurrentDomainInfo = async (domain: string)  => {
   const user = await currentUser()
   if(!user) return 
   try {
    const userDomain = await client.user.findUnique({
      where: {
      clerkId: user.id
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: {
              contains: domain,
            },
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            chatBot: {
              select: {
                id:true,
                welcomeMessage: true,
                icon: true,
              },
            },
          },
        }
      }

    })
    if(userDomain){
       return userDomain
    }
   } catch (error) {
     console.log(error)
     return {status: 400}
   }
}

export const onUpdateDomain = async(id:string, name:string) => {
      try{
        const domainExists = await client.domain.findFirst({
          where: {
            name: {
              contains: name,
            },
          },
        })
        if(!domainExists){
          const domain = await client.domain.update({
            where:{
              id,
            },
            data: {
              name,
            }
          })
          if(domain){
            return{
              status:200,
              message:  'Domain Updated'
            }
          }
          return {
            status: 400,
            message: 'Domain with this name already exists',
          }
        }
      }catch(error){
          console.log(error);
      }
}

export const onChatBotImageUpdate = async (id:string, icon: string) => {
   const user = await currentUser()
   if(!user) return

   try{
    const domain = await client.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            data: {
              icon,
            }
          }
        }
      }
    })
    if(domain){
      return {
        status:200,
        message: 'Domain updated'
      }
    }
    return {
      status:400,
      message: 'Oops Something went wrong!'
    }
   }catch(error){
    console.log(error)
   }
}

export const onUpdateWelcomeMessage = async(message:string, domainId:string) => {
  try {
    const updated = await client.domain.update({
      where: {
        id: domainId,
      },
      data:{
         chatBot: {
          update: {
            data: {
              welcomeMessage: message,
            }
          }
         }
      }
    })

    if(updated){
      return{ status: 200, message: 'Welcome message updated'}
    }
  } catch (error) {
    console.log(error)
  }
  
}

export const onDeleteUserDomain = async (id: string) => {
  const user = await currentUser();

  if(!user) return

  try {
      const validUser = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          id:true
        },
      })
    if(validUser){
      const update = await client.domain.delete({
        where: {
          id,
          userId: validUser.id
        },
        select: {
          name: true,
        }
      })
      if(update){
        return {status: 200, message: `'${update.name}' Domain deleted successfully`}
      }
    }
     
  } catch (error) {
    console.log(error)
  }
}

export const onCreateHelpDeskQuestion = async (id: string, question: string, answer: string ) => {
     try {
         const helpDeskQuestion = await client.domain.update({
          where: {
            id
          },
          data: {
              helpdesk: {
                create: {
                  question,
                  answer
                }
              }
          },
          include: {
            helpdesk: {
              select: {
                id:true,
                question:true,
                answer: true
              }
            }
          }
        })

        if(helpDeskQuestion){
          return{status: 200, message: 'New help desk question added' ,questions: helpDeskQuestion.helpdesk }
        }
        return{status: 400, message: 'Oops! Something went wrong'}

     } catch (error) {
       console.log(error)
       return {status: 400}
     }
}

export const onGetAllHelpDeskQuestions = async(id:string) => {
  try {
    const questions= await client.helpDesk.findMany({
      where: {
        domainId: id
      },
      select: {
        question: true,
        answer:true,
        id:true
      }
    })

    return{
      status:200,
      message: 'New help desk questions added',
      questions: questions
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreateFilterQuestion= async (id:string, question: string) => {
    try {
      const filterQuestion = await client.domain.update({
        where: {
          id,
        },
        data: {
           filterQuestions: {
                  create: {
                    question,
                  }
           }
        },
        include: {
          filterQuestions: {
            select: {
              id:true,
              question: true
            }
          }
        }

    })
    if(filterQuestion){
      return{
        status:200,
        message: 'Filter Question added',
        question: filterQuestion.filterQuestions
      }
    }
    return{
      status: 400,
      message: 'Oops something went wrong'
    }
    } catch (error) {
      console.log(error)
    }
}

export const onGetAllFilterQuestion = async (id: string) => {
  try {
    const filterQuestion = await client.filterQuestions.findMany({
      where:{
        domainId: id
      },
      select: {
        question: true,
        id:true
      },
      orderBy: {
        question: 'asc'
      },
    })
    return{
      status: 200,
      message: '',
      question: filterQuestion
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetPaymentConnected = async () => {
        try{
        const user = await currentUser()
        if(user){
          const connected = await client.user.findUnique({
            where: {
              clerkId: user.id,
            },
            select: {
              stripeId: true,
            }
          })
          if(connected){
            return connected.stripeId
          }
        }
        }catch(error){
        console.log(error)
        }
}


