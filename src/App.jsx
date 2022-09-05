import { useState,useEffect,useReducer } from 'react'

const ACTIONS =
{
  ADD_DIGIT:'add-digit',
  EXECUTE:'execute',
  CLEAR:'clear',
  DELETE:'delete',
  CHOOSE_OPERATION:'chose-operation'
}

function reducer(state,{type,payload})
{
  switch(type)
  {
    case ACTIONS.ADD_DIGIT:
    {
      if(state.currentString==='0'&&payload.digit==='0')return state
      if(state.currentString!==undefined)
      {        
        if(state.currentString.includes('.')&&payload.digit==='.')return state
      }
      return{
          ...state,
          currentString:`${state.currentString||''}${payload.digit}`
        }
    }
    case ACTIONS.CLEAR:
    {
      return{}
    }
    case ACTIONS.CHOOSE_OPERATION:
    {
      if(state.previosString===null || state.previosString===undefined && payload.digit===null || payload.digit===undefined)
      {
        return state
      }
      if(state.previosString===undefined)
      {
         return{
           ...state,
           previosString:state.currentString,
           operation:payload.digit,
           currentString:undefined
         }
      }
      
      if(state.previosString!==undefined && state.currentString===undefined)return state
      
      return {
        ...state,
        previosString:`${eval(`${state.previosString}${state.operation}${state.currentString}`)}`,
        operation:payload.digit,
        currentString:undefined
       }
    }
    case ACTIONS.EXECUTE:
    {
       if(state.previosString===undefined)return state
       if(state.previosString!==undefined && state.currentString===undefined)return state

       return {
        ...state,
        previosString:undefined,
        currentString:`${eval(`${state.previosString}${state.operation}${state.currentString}`)}`,
        operation:undefined
       }
    }
    case ACTIONS.DELETE:
    {
       if(state.previosString!==undefined && state.currentString===undefined)return state
       return{
        ...state,
        currentString:state.currentString.substr(0,state.currentString.length-1),
       }
    }
  }
}


function App() 
{
  const[{currentString,previosString,operation},dispatch]=useReducer(reducer,{})

  return (
    <>
      <header className="block bg-gradient-to-b from-blue-500 to-violet-600 p-[.5rem] text-[1.2rem]">
        <span className="block uppercase font-bold text-center">
          fun calculator
        </span>
      </header>
      <main className='flex justify-center mt-[2rem] px-[1.5rem]'>
          <div className='p-[2.5rem] flex flex-col justify-between w-[33rem] max-w-[100%] rounded-[.5rem] h-[38rem] bg-slate-800 border-[1px] border-gray-500'>
            <Visor 
             currentString={currentString} 
             previosString={previosString}
             operation={operation}
             />

            <section className='grid grid-cols-4 grid-rows-5 gap-[1rem]'>
              <button  className={`col-start-1 col-span-2 bg-pink-600 text-black font-bold text-[1.2rem] rounded-[.2rem] py-[1rem] uppercase`} 
                onClick={()=> dispatch({type: ACTIONS.CLEAR})}
              >
                ac
              </button>
              <button  className={`bg-orange-100 text-black font-bold text-[1.2rem] rounded-[.2rem] py-[1rem] uppercase`} 
                onClick={()=> dispatch({type: ACTIONS.DELETE})}
              >
                del
              </button>
              <ButtonOperation digit={'/'} dispatch={dispatch} >/</ButtonOperation>
              <Button digit={'1'} dispatch={dispatch} >1</Button>
              <Button digit={'2'} dispatch={dispatch} >2</Button>
              <Button digit={'3'} dispatch={dispatch} >3</Button>
              <ButtonOperation digit={'*'} dispatch={dispatch} >*</ButtonOperation>
              <Button digit={'4'} dispatch={dispatch} >4</Button>
              <Button digit={'5'} dispatch={dispatch} >5</Button>
              <Button digit={'6'} dispatch={dispatch} >6</Button>
              <ButtonOperation digit={'+'} dispatch={dispatch} >+</ButtonOperation>
              <Button digit={'7'} dispatch={dispatch} >7</Button>
              <Button digit={'8'} dispatch={dispatch} >8</Button>
              <Button digit={'9'} dispatch={dispatch} >9</Button>
              <ButtonOperation digit={'-'} dispatch={dispatch} >-</ButtonOperation>
              <Button digit={'.'} dispatch={dispatch} >.</Button>
              <Button digit={'0'} dispatch={dispatch} >0</Button>
              <button  className={`col-start-3 col-span-2 bg-pink-600 text-black font-bold text-[1.2rem] rounded-[.2rem] py-[1rem] uppercase`} 
                onClick={()=> dispatch({type: ACTIONS.EXECUTE})}
              >
                =
              </button>

            </section>
          </div>
      </main>
    </>
  );
}

function Button(props) 
{
  const{
    digit,
    dispatch,
    children
  }=props
  
  return(    
    <button data-value={digit} className='bg-orange-100 text-black font-bold text-[1.2rem] rounded-[.2rem] py-[1rem] uppercase' 
      onClick={()=> dispatch({type: ACTIONS.ADD_DIGIT, payload:{digit}})}
    >
    {children}
    </button>
  );
}
function ButtonOperation(props)
{
  const{
   dispatch,
   digit,
   children
  }=props
  return(    
    <button data-value={digit} className='bg-orange-100 text-black font-bold text-[1.2rem] rounded-[.2rem] py-[1rem] uppercase' 
      onClick={()=> dispatch({type: ACTIONS.CHOOSE_OPERATION, payload:{digit}})}
    >
    {children}
    </button>
  );
}

function Visor(props) 
{
  const{
    currentString,
    previosString,
    operation
  }=props
  return (
    <section className='flex font-bold flex-col items-end justify-between bg-black h-[6.2rem] rounded-[.5rem] p-[1rem]'>
      <span className='text-[1.4rem]'>
        {previosString||''}{operation}
      </span>
      <span className='text-[2rem]'>
        {currentString}
      </span>
  </section>);
}

export default App