import React from 'react'

const Locationsearchpannel = ({ suggestions, setPickup, setDestination, activeField }) => {
     
  const handleSuggestionClick = (suggestion) => {
    console.log('Suggestion clicked:', suggestion);
    if (activeField === 'pickup') {
        setPickup(suggestion.value)
    } else if (activeField === 'destination') {
        setDestination(suggestion.value)
    }
    // setVehicalpannel(true)
    // setPannel(false)
}

console.log('Locationsearchpannel received suggestions:', suggestions);
console.log('Active field:', activeField);
console.log('Suggestions length:', suggestions?.length);
     
// this is respoonsible to how the suggetion data whenever you type something in pickup and destination panel
return (
  <div>
      {/* Display fetched suggestions */}
      {suggestions && suggestions.length > 0 ? (
          suggestions.map((elem, idx) => (
              <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                  <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                  <h4 className='font-medium'>{elem.value}</h4>
              </div>
          ))
      ) : (
          <div className='p-3 text-gray-500'>No suggestions found</div>
      )}
  </div>
)
}

export default Locationsearchpannel


