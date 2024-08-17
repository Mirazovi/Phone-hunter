const loaderData = async (id=13,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${id}`);
    const data = await res.json();
    const phones = data.data;
    SetData(phones,isShowAll);
}
const SetData = (phones,isShowAll) => {

    const ContainerSet = document.getElementById('Container');
    ContainerSet.textContent = '';
    const ShowMore = document.getElementById('show-more');
    
    if(phones.length > 12 && !isShowAll){
        ShowMore.classList.remove('hidden');
    }else{
        ShowMore.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }
   
    phones.map(phone => {
    const divContainer = document.createElement('div');
    divContainer.classList = (' text-center p-6 rounded-2xl border ')
    divContainer.innerHTML = `
         <img class=" flex justify-center items-center" src=${phone.image} alt="">
            <h1 class="text-2xl font-bold ">${phone.phone_name}</h1>
            <p class="text-xl ">${phone.slug}</p>
            <div class="justify-center flex items-center flex-grow">
            <button onclick="handleShowDetails('${phone.slug}')" class="bg-[#0D6EFD] py-2 px-4 rounded-lg border text-xl text-center text-white  my-2">Show Details</button> 
            </div>
        `
        ContainerSet.appendChild(divContainer);
      })
    ToggleLoadingSpinner(false);
}
// Show Details 
const handleShowDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    ShowHandleDetails(phone)
}
const ShowHandleDetails  = (id) =>{
    my_modal_5.showModal();
    const phone = document.getElementById('phone-container');
    phone.innerHTML = `
    <h1>${id.name}</h1>
    <img src=${id.image} alt="">
    <h1>${id.mainFeatures.storage}</h1>
    <p>${id.mainFeatures.displaySize}</p>
    `
}
//  handleSearchInput 
const handleSearch = (isShowAll) =>{
    ToggleLoadingSpinner(true);
    const searchData = document.getElementById('search-input');
    const searchText = searchData.value;
    loaderData(searchText,isShowAll)

}
// LoadingSpinner
const ToggleLoadingSpinner = (isLoading) =>{
    const LoaderSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        LoaderSpinner.classList.remove('hidden');
    }else{
        LoaderSpinner.classList.add('hidden');
    }

}
// handleShowMore All
const handleShowMore = () =>{
        handleSearch(true);
}
loaderData();
