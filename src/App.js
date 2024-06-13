import {useEffect, useState} from 'react'
import sidebarMobile from './assets/images/bg-sidebar-mobile.svg'
import arcadeIcon from './assets/images/icon-arcade.svg'
import advancedIcon from './assets/images/icon-advanced.svg'
import proIcon from './assets/images/icon-pro.svg'
import iconThankyou from './assets/images/icon-thank-you.svg'
import sidebarDesktop from './assets/images/bg-sidebar-desktop.svg'
import './App.css';

function App() {
  const [option, setOption] = useState(true)
  // option true = monthly; false = yearly
  const [plan, setPlan] = useState([1,0,0])
  const [onlineService, setOnlineService] = useState(true);
  const [largerStorage, setLargerStorage] = useState(true);
  const [CustomizableProfile, setCustomizableProfile] = useState(false);
  const [activeStep, setActiveStep] = useState(1);


  return (
    <div className="App">
        <div className='bottom-0 bg-grey-light absolute top-0 left-0 right-0 -z-10'/>
        <img src={sidebarMobile} alt='sidebar' className='absolute w-full md:hidden top-0 left-0 right-0 -z-10'/>
        {/* mobile step indicators */}
        <div className='h-[172px] flex gap-4 justify-center md:hidden items-start pt-9'>
          <StepperIndicator stepNumber={1} isCurrent={activeStep === 1 && true}/>
          <StepperIndicator stepNumber={2} isCurrent={activeStep === 2 && true}/>
          <StepperIndicator stepNumber={3} isCurrent={activeStep === 3 && true}/>
          <StepperIndicator stepNumber={4} isCurrent={activeStep === 4 || activeStep ===5 && true}/>
        </div>
        <div className='relative'>
          {activeStep === 1 && <StepOne activeStep={activeStep} setActiveStep={setActiveStep}/>}
          {activeStep === 2 &&  <StepTwo activeStep={activeStep} setActiveStep={setActiveStep} option={option} setOption={setOption} plan={plan} setPlan={setPlan} />}
          {activeStep === 3 && <StepThree activeStep={activeStep} setActiveStep={setActiveStep}  option={option} state={{onlineService, largerStorage, CustomizableProfile}}  setOnlineService={setOnlineService} setLargerStorage={setLargerStorage} setCustomizableProfile={setCustomizableProfile}   />}
          {activeStep === 4 && <StepFour activeStep={activeStep} setActiveStep={setActiveStep}  state={{onlineService, largerStorage, CustomizableProfile}} plan={plan} option={option}/>}
          {activeStep === 5 && <StepFive activeStep={activeStep}/>}
        </div>
        {/* only mobile buttons */}
        <div className={`fixed bottom-0 md:hidden left-0 right-0 bg-white py-4 px-2 ${activeStep === 5 && "hidden" }`}>
          <button onClick={()=> setActiveStep( activeStep>1 ?  activeStep - 1 : activeStep)} className={`py-2 px-2 font-bold text-grey-cool ${activeStep === 1 && "hidden"}`}>Go Back</button>
          <button onClick={()=> setActiveStep( activeStep<5 ? activeStep+1 : activeStep)} className={`px-4 py-2 ${activeStep === 4 ? "bg-blue-purpleish" : "bg-blue-marine"}  text-white rounded-md float-end`}>{activeStep === 4 ? "Confirm" : "Next Step"}</button>
        </div>
      </div>
  );
}

function DesktopStepper({activeStep}){
  return(
    <div className='hidden md:block relative'>
      <img src={sidebarDesktop} alt='sidebar image'/>
      <div className='flex md:p-4 flex-col gap-4 absolute top-0 left-0 right-0 justify-center items-start pt-9'>
          <StepperIndicator stepNumber={1} isCurrent={activeStep === 1 && true}/>
          <StepperIndicator stepNumber={2} isCurrent={activeStep === 2 && true}/>
          <StepperIndicator stepNumber={3} isCurrent={activeStep === 3 && true}/>
          <StepperIndicator stepNumber={4} isCurrent={activeStep === 4 || activeStep ===5 && true}/>
        </div>
          
    </div>
  )
}

function StepOne({activeStep, setActiveStep}){

  return(
     <div className='w-[90%] md:w-fit mb-20 md:mb-0 md:p-6 md:pr-16 gap-12 p-4 mx-auto md:flex md:relative  md:mt-16 -mt-16 rounded-md bg-white shadow-md'>
        <DesktopStepper activeStep={activeStep}/>
        <div className='md:mt-10 md:w-[450px]'>
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
        <div className='hidden md:block absolute bottom-6 right-16'>
          <button onClick={()=> setActiveStep( activeStep<5 ? activeStep+1 : activeStep)} className={`px-4 py-2 ${activeStep === 4 ? "bg-blue-purpleish" : "bg-blue-marine"}  text-white rounded-md float-end`}>{activeStep === 4 ? "Confirm" : "Next Step"}</button>
        </div>
      </div> 
      )
}

function StepTwo({option, setOption, setPlan, plan, activeStep, setActiveStep}){
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
    <div className='w-[90%]  mb-20 md:mb-0 md:w-fit md:p-6 md:pr-16 mx-auto p-4 md:mt-16 md:flex md:gap-12 md:relative -mt-16 rounded-md bg-white shadow-md'>
      <DesktopStepper activeStep={activeStep}/>
       <div className='md:relative md: mt-10 md:w-[450px]'>
        <h3 className='text-blue-marine font-bold text-2xl'>Select your plan</h3>
        <p className='text-lg font-normal text-grey-cool mb-4'>You have the option of monthly or yearly billing.</p>
        <div className='flex md:flex-row flex-col gap-4 mb-8'>
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
            <div className={`${option ? "text-blue-marine font-medium" : "text-grey-cool"} `}>Monthly</div>
            <div onClick={()=> setOption(!option)}>
              <Switch option={option}/>
            </div>
            <div className={`${option ? "text-grey-cool" : "text-blue-marine font-medium" } `}>Yearly</div>
        </div>
        <div className='hidden md:block absolute bottom-0 right-0'>
          <button onClick={()=> setActiveStep( activeStep<5 ? activeStep+1 : activeStep)} className={`px-4 py-2 ${activeStep === 4 ? "bg-blue-purpleish" : "bg-blue-marine"}  text-white rounded-md float-end`}>{activeStep === 4 ? "Confirm" : "Next Step"}</button>
        </div>
        <div className='hidden md:block absolute left-0 bottom-0'>
          <button onClick={()=> setActiveStep( activeStep>1 ?  activeStep - 1 : activeStep)} className={`py-2 px-2 font-bold text-grey-cool ${activeStep === 1 && "hidden"}`}>Go Back</button>
        </div>
       </div>
       
    </div>
  )
}

function StepThree({option, state, setOnlineService, setLargerStorage, setCustomizableProfile , activeStep, setActiveStep}){
  return(
    <div className='w-[90%]  mb-20 md:mb-0 md:w-fit md:p-6 md:pr-16 mx-auto p-4 md:mt-16 md:flex md:gap-12 md:relative -mt-16 rounded-md bg-white shadow-md'>
       <DesktopStepper activeStep={activeStep}/>
        <div className='md:relative md: mt-10 md:w-[450px]'>
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
        <div className='hidden md:block absolute bottom-0 right-0'>
          <button onClick={()=> setActiveStep( activeStep<5 ? activeStep+1 : activeStep)} className={`px-4 py-2 ${activeStep === 4 ? "bg-blue-purpleish" : "bg-blue-marine"}  text-white rounded-md float-end`}>{activeStep === 4 ? "Confirm" : "Next Step"}</button>
        </div>
        <div className='hidden md:block absolute left-0 bottom-0'>
          <button onClick={()=> setActiveStep( activeStep>1 ?  activeStep - 1 : activeStep)} className={`py-2 px-2 font-bold text-grey-cool ${activeStep === 1 && "hidden"}`}>Go Back</button>
        </div>
        </div>
    </div>
  )
}

function StepFour({state,plan,option, activeStep, setActiveStep}){
  const [total, setTotal] = useState(0);
  useEffect(() => {
    function calculateTotal(){
      if(option){
        setTotal((state.CustomizableProfile ? 2 : 0) + (state.onlineService ? 1 : 0) + (state.largerStorage ? 2 : 0) + (plan[0] && 9 || plan[1] && 12 || plan[2] && 15 )) 
      }else{
        setTotal((state.CustomizableProfile ? 20 : 0) + (state.onlineService ? 10 : 0) + (state.largerStorage ? 20 : 0) + (plan[0] && 90 || plan[1] && 120 || plan[2] && 150 ))
      }
    }
    calculateTotal();
  }, [])
  return(
    <div className='w-[90%]  mb-20 md:mb-0 md:w-fit md:p-6 md:pr-16 mx-auto p-4 md:mt-16 md:flex md:gap-12 md:relative -mt-16 rounded-md bg-white shadow-md'>
       <DesktopStepper activeStep={activeStep}/>
       <div className='md:relative md: mt-10 md:w-[450px]'>
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
              ${option ? (plan[0] && 9 || plan[1] && 12 || plan[2] && 15 ) : (plan[0] && 90 || plan[1] && 120 || plan[2] && 150 )}/{ option ? "mo" : "yr"}
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
                  <div className='text-blue-marine font-medium'>
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
                  <div className='text-blue-marine font-medium'>
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
                  <div className='text-blue-marine font-medium'>
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
  
       <div className='hidden md:block absolute bottom-0 right-0'>
          <button onClick={()=> setActiveStep( activeStep<5 ? activeStep+1 : activeStep)} className={`px-4 py-2 ${activeStep === 4 ? "bg-blue-purpleish" : "bg-blue-marine"}  text-white rounded-md float-end`}>{activeStep === 4 ? "Confirm" : "Next Step"}</button>
        </div>
        <div className='hidden md:block absolute left-0 bottom-0'>
          <button onClick={()=> setActiveStep( activeStep>1 ?  activeStep - 1 : activeStep)} className={`py-2 px-2 font-bold text-grey-cool ${activeStep === 1 && "hidden"}`}>Go Back</button>
        </div>
        </div>  
    </div>
  )
}

function StepFive({activeStep}){
  return(
    <div className='w-[90%]  mb-20 md:mb-0 md:w-fit md:p-6 md:pr-16 mx-auto p-4 md:mt-16 md:flex md:gap-12 md:items-center md:relative -mt-16 rounded-md bg-white shadow-md'>
       <DesktopStepper activeStep={activeStep}/>
       <div className='md:relative md: mt-10 md:w-[450px]'>
      <img src={iconThankyou} alt='Thank you' className='mx-auto mb-8 w-14'/>
      <h3 className='text-blue-marine text-center font-bold mb-4 text-2xl'>Thank you!</h3>
      <p className='font-normal text-center text-grey-cool mb-8'>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>    
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
    <div onClick={()=> setIsSelected(!isSelected)} className={`flex justify-between items-center gap-4 md:p-6 p-2 px-4  border border-solid ${isSelected ? "border-blue-purpleish bg-grey-light/20 " : "border-grey-light"}  rounded-lg `}>
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
    <div className={`flex gap-4 ${yearly ? "p-2" : "p-4" } md:flex-col md:w-32 md:h-36 border border-solid border-blue-purpleish rounded-lg ${selected === 1 ? 'bg-grey-light/40' : null}`}>
      <img src={icon} alt='arcade icon' className='md:w-8'/>
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
    <div className='md:flex md:items-center md:p-1 md:gap-4'>
      <div className={`h-9 w-9 rounded-full font-bold border border-solid ${isCurrent ? "text-blue-marine border-none bg-blue-light" : "text-white"}  border-white flex justify-center items-center`}>{stepNumber}</div>
      <div className='hidden md:block'>
        <div className='text-grey-cool text-sm'>STEP {stepNumber}</div>
        <div className='text-white'>{stepNumber === 1 && "YOUR INFO"} {stepNumber === 2 && "SELECT PLAN"} {stepNumber === 3 && "ADD-ONS"} {stepNumber === 4 && "SUMMARY"} </div>
      </div>
    </div>
  )
}

export default App;
