import {useEffect, useState} from 'react'
import sidebarMobile from './assets/images/bg-sidebar-mobile.svg'
import arcadeIcon from './assets/images/icon-arcade.svg'
import advancedIcon from './assets/images/icon-advanced.svg'
import proIcon from './assets/images/icon-pro.svg'
import './App.css';

function App() {
  const [option, setOption] = useState(false)
  // option true = monthly; false = yearly
  const [plan, setPlan] = useState([1,0,0])
  const [onlineService, setOnlineService] = useState(true);
  const [largerStorage, setLargerStorage] = useState(true);
  const [CustomizableProfile, setCustomizableProfile] = useState(false);
  const [activeStep, setActiveStep] = useState(1);


  return (
    <div className="App">
        <div className=' h-screen bg-grey-light absolute top-0 left-0 right-0 -z-10'/>
        <img src={sidebarMobile} alt='sidebar' className='absolute top-0 left-0 right-0 -z-10'/>
        <div className='h-[172px] flex gap-4 justify-center items-start pt-9'>
          <StepperIndicator stepNumber={1} isCurrent={activeStep === 1 && true}/>
          <StepperIndicator stepNumber={2} isCurrent={activeStep === 2 && true}/>
          <StepperIndicator stepNumber={3} isCurrent={activeStep === 3 && true}/>
          <StepperIndicator stepNumber={4} isCurrent={activeStep === 4 && true}/>
        </div>
        <div className='relative'>
          {activeStep === 1 && <StepOne/>}
          {activeStep === 2 &&  <StepTwo option={option} setOption={setOption} plan={plan} setPlan={setPlan} />}
          {activeStep === 3 && <StepThree option={option} state={{onlineService, largerStorage, CustomizableProfile}}  setOnlineService={setOnlineService} setLargerStorage={setLargerStorage} setCustomizableProfile={setCustomizableProfile}   />}
          {activeStep === 4 && <StepFour state={{onlineService, largerStorage, CustomizableProfile}} plan={plan} option={option}/>}
        </div>
        <div className='absolute bottom-0 left-0 right-0 bg-white py-4 px-2'>
          <button onClick={()=> setActiveStep( activeStep>1 ?  activeStep - 1 : activeStep)} className='py-2 text-grey-cool'>Go Back</button>
          <button onClick={()=> setActiveStep( activeStep<4 ? activeStep+1 : activeStep)} className={`px-4 py-2 ${activeStep === 4 ? "bg-blue-purpleish" : "bg-blue-marine"}  text-white rounded-md float-end`}>{activeStep === 4 ? "Confirm" : "Next Step"}</button>
        </div>
      </div>
  );
}

function StepOne(){

  return(
     <div className='w-[90%] p-4 mx-auto -mt-16 rounded-md bg-white shadow-md'>
        <h3 className='text-blue-marine font-bold text-2xl'>Personal info</h3>
        <p className='text-lg font-normal text-grey-cool'>Please provide your name, email address, and phone number.</p>
        <div className='pt-6'>
          <label htmlFor="name" className='block font-medium text-blue-marine text-sm'>Name</label>
          <input type="text" name="name" id="name" placeholder='e.g. Stephen King' className='block border border-solid border-grey-light px-4 py-2 rounded w-full mb-4'/>
          <label htmlFor="name" className='block font-medium text-blue-marine text-sm'>Email Address</label>
          <input type="text" name="name" id="name" placeholder='e.g. stephenking@lorem.com' className='block border border-solid border-grey-light px-4 py-2 rounded w-full mb-4'/>
          <label htmlFor="name" className='block font-medium text-blue-marine text-sm'>Phone Number</label>
          <input type="text" name="name" id="name" placeholder='e.g. +1 234 567 890' className='block border border-solid border-grey-light px-4 py-2 rounded w-full mb-4'/>
        </div>
      </div> 
      )
}

function StepTwo({option, setOption, setPlan, plan}){
  const [selected, setSelected] = useState('Arcade');
  function selectPlan(selected){
    switch (selected) {
      case 'Arcade':
        setSelected('Arcade');
        setPlan([1,0,0]);
        break;
      case 'Advanced':
        setSelected('Advanced');
        setPlan([0,1,0]);
        break;
      case 'Pro':
        setSelected('Pro');
        setPlan([0,0,1]);
        break;
      default:
        break;
    }
  }
  return(
    <div className='w-[90%] p-4 mx-auto -mt-16 rounded-md bg-white shadow-md'>
       <h3 className='text-blue-marine font-bold text-2xl'>Select your plan</h3>
       <p className='text-lg font-normal text-grey-cool mb-4'>You have the option of monthly or yearly billing.</p>
       <div className='flex flex-col gap-4 mb-8'>
        { option && <>
          <div onClick={()=> selectPlan('Arcade')}><PlanOption icon={arcadeIcon} price={9} plan="Arcade" selected={plan[0]}/></div>
          <div onClick={()=> selectPlan('Advanced')}><PlanOption icon={advancedIcon} price={12} plan="Advanced" selected={plan[1]}/></div>
          <div onClick={()=> selectPlan('Pro')}><PlanOption icon={proIcon} price={15} plan="Pro" selected={plan[2]}/></div>
          </>
        }
         { !option && <>
          <div onClick={()=> selectPlan('Arcade')}><PlanOption icon={arcadeIcon} price={90} plan="Arcade" selected={plan[0]} yearly/></div>
          <div onClick={()=> selectPlan('Advanced')}><PlanOption icon={advancedIcon} price={120} plan="Advanced" selected={plan[1]} yearly/></div>
          <div onClick={()=> selectPlan('Pro')}><PlanOption icon={proIcon} price={150} plan="Pro" selected={plan[2]} yearly/></div>
          </>
        }
       </div>
       <div className='flex justify-center gap-4 p-2 bg-grey-light/20 rounded-md'>
          <div className={`${option === 'Monthly' ? "text-blue-marine" : ""} font-medium`}>Monthly</div>
          <div onClick={()=> setOption(!option)}>
            <Switch option={option}/>
          </div>
          <div className={`${option === 'Yearly' ? "text-blue-marine" : "text-grey-cool"} font-medium`}>Yearly</div>
       </div>
    </div>
  )
}

function StepThree({option, state, setOnlineService, setLargerStorage, setCustomizableProfile }){
  return(
    <div className='w-[90%] p-4 mx-auto -mt-16 rounded-md bg-white shadow-md'>
      <h3 className='text-blue-marine font-bold text-2xl'>Pick add-ons</h3>
      <p className='text-lg font-normal text-grey-cool mb-4'>Add-ons help enhance your gaming experience.</p>
      <div className='flex flex-col gap-4'>
       {option && <>
        <div onClick={()=> setOnlineService(!state.onlineService)}>
          <AddonOption setIsSelected={setOnlineService} isSelected={state.onlineService} plan="Online service" description="Access to multiplayer games" price={1} option={option} />
        </div>
        <div onClick={()=> setLargerStorage(!state.largerStorage)}>
         <AddonOption setIsSelected={setLargerStorage} isSelected={state.largerStorage}  plan="Larger storage" description="Extra 1TB of cloud save" price={2} option={option} />
        </div>
        <div onClick={()=> setCustomizableProfile(!state.CustomizableProfile)}>
          <AddonOption setIsSelected={setCustomizableProfile} isSelected={state.CustomizableProfile}  plan="Customizable profile" description="Custom theme on your profile" price={2}  option={option}/>
        </div>
       </>
      }
      {
        !option && <>
         <div onClick={()=> setOnlineService(!state.onlineService)}>
           <AddonOption setIsSelected={setOnlineService} isSelected={state.onlineService}  plan="Online service" description="Access to multiplayer games" price={10}  option={option}/>
          </div>
          <div onClick={()=> setLargerStorage(!state.largerStorage)}>
            <AddonOption setIsSelected={setLargerStorage} isSelected={state.largerStorage}  plan="Larger storage" description="Extra 1TB of cloud save" price={20}  option={option}/>
          </div>
          <div onClick={()=> setCustomizableProfile(!state.CustomizableProfile)}>
            <AddonOption setIsSelected={setCustomizableProfile} isSelected={state.CustomizableProfile} plan="Customizable profile" description="Custom theme on your profile" price={20} option={option}/>
          </div>
        </>
      }

      </div>
    </div>
  )
}

function StepFour({state,plan,option}){
  const [total, setTotal] = useState(0);
  useEffect(() => {
    function calculateTotal(){
      if(option){
        setTotal((state.CustomizableProfile ? 2 : 0) + (state.onlineService ? 1 : 0) + (state.largerStorage ? 2 : 0) + 9) 
      }else{
        setTotal((state.CustomizableProfile ? 20 : 0) + (state.onlineService ? 10 : 0) + (state.largerStorage ? 20 : 0) + 90)
      }
    }
    calculateTotal();
  }, [])
  return(
    <div className='w-[90%] p-4 py-6 mx-auto -mt-16 rounded-md bg-white shadow-md'>
      <h3 className='text-blue-marine font-bold text-2xl'>Finishing up</h3>
      <p className='text-lg font-normal text-grey-cool mb-8'>Double-check everything looks OK before confirming.</p>
      <div className='bg-grey-light/20 rounded-md px-4 py-2'>
        <div className=' flex items-center justify-between mb-2'>
          {
            plan[0] === 1 &&
              <div className='flex flex-col text-blue-marine'>
                <div className='font-semibold'>Arcade ({option ? "Monthly" : "Yearly"})</div>
                <div className='underline text-grey-cool'>Change</div>
              </div>
          }
           {
            plan[1] === 1 &&
              <div className='flex flex-col text-blue-marine'>
                <div className='font-semibold'>Advanced ({option ? "Monthly" : "Yearly"})</div>
                <div className='underline text-grey-cool'>Change</div>
              </div>
          }
              {
            plan[2] === 1 &&
              <div className='flex flex-col text-blue-marine'>
                <div className='font-semibold'>Pro ({option ? "Monthly" : "Yearly"})</div>
                <div className='underline text-grey-cool'>Change</div>
              </div>
          }
          <div className='font-semibold text-blue-marine'>
            ${option ? 9 : 90}/{ option ? "mo" : "yr"}
          </div>
        </div>
        <hr/>
        <div className='text-grey-cool mt-4'>
          <div className='mb-2'>
            {state.onlineService && 
              <div className='flex justify-between'>
                <div>
                  Online Service
                </div>
                <div>
                  +{option ? 1 : 10}/{ option ? "mo" : "yr"}
                </div>
            </div>
            }
          </div>
          <div className='mb-2'>
            {state.largerStorage &&
              <div className='flex justify-between'>
                <div>
                  Larger Storage
                </div>
                <div>
                  +{option ? 2 : 20}/{ option ? "mo" : "yr"}
                </div>
              </div>
            }
          </div>
          <div>
            {state.CustomizableProfile &&
              <div className='flex justify-between'>
                <div>
                  Customizable Profile
                </div>
                <div>
                  +{option ? 2 : 20}/{ option ? "mo" : "yr"}
                </div>
            </div>
            }
          </div>
        </div>
      </div>
      <div className='flex text-grey-cool justify-between px-4 py-2 my-2 '>
          <div>Total (per {option ? "month" : "year"})</div> 
          <div className='text-blue-purpleish font-semibold'>+${total}/{option ? "mo" : "yr"}</div>
        </div>
    </div>
  )
}

function Switch({option}){
  return(
    <div className='w-10 h-5 rounded-full bg-blue-marine py-1'>
      <div className={`h-3  w-3 rounded-full bg-white ${option  ? "ml-1" : "ml-6"} transition-all`}/>
    </div>
  )
}

function AddonOption({ plan, description, price, option, isSelected, setIsSelected}){
 return(
    <div onClick={()=> setIsSelected(!isSelected)} className={`flex justify-between items-center gap-4 p-2 px-4  border border-solid ${isSelected ? "border-blue-purpleish bg-grey-light/20 " : "border-grey-light"}  rounded-lg `}>
      <div className='flex items-center'>
      <input className='mr-4 accent-blue-purpleish scale-150' checked={isSelected} type="checkbox" name="" id="" />
      <div>
        <div className='font-semibold text-blue-marine'>{plan}</div>
        <div className='text-xs text-grey-cool float-end'>{description}</div>
      </div>
      </div>
      <div className='text-xs text-blue-purpleish'>
        +${price}/{option ? "mo" : "yr"}
      </div>
    </div>
 )
}

function PlanOption({icon, price, plan, selected, yearly}){
  return(
    <div className={`flex gap-4 ${yearly ? "p-2" : "p-4" }  border border-solid border-blue-purpleish rounded-lg ${selected === 1 ? 'bg-grey-light/40' : null}`}>
      <img src={icon} alt='arcade icon'/>
      <div>
        <div className='font-semibold text-blue-marine'>{plan}</div>
        <div className='text-sm text-grey-cool'>${price}/{yearly ? "yr" : "mo"}</div>
        {yearly && <div className='text-xs text-blue-marine font-medium transition-all'>2 months free</div>}
      </div>
    </div>
  )
}

function StepperIndicator({stepNumber, isCurrent}){
  return(
    <div className={`h-9 w-9 rounded-full font-bold border border-solid ${isCurrent ? "text-blue-marine border-none bg-blue-light" : "text-white"}  border-white flex justify-center items-center`}>{stepNumber}</div>
  )
}

export default App;
