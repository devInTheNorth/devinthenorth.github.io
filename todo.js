 let currentKey = '', currentOp = 'A';
         window.addEventListener('load', () => {
           // fetchItems("#tasks-2m");
            //document.querySelector('.btnDelete').addEventListener('click', () => {
           // alert('okagvg');
            initButtons();
            Object.prototype.hasItems = () => (Object.length != 0)? true: false;
            
                expandList('#tasks-2m', "#btn2m"); 
           
        }); 

        function initButtons(){
            let delBtns = document.querySelectorAll('.btnDelete');
            for (let x of delBtns){
                x.addEventListener('click', () => {
                    let delKey = x.getAttribute('data-key');
                document.querySelector(`div[data-taskid='${x.getAttribute('data-key')}']`).style.display = 'none';
                localStorage.removeItem(delKey);
                document.querySelector('.placeholder').innerHTML = 'Deleted !';
                document.querySelector('.Popup-content').style.backgroundColor = 'salmon';
                document.querySelector('#Popup').style.display = 'block'; 
                let c = document.querySelector('#Popup');
                


                });
            }
            let editBns = document.querySelectorAll('.btnEdit');
            for (let m of editBns){
                m.addEventListener('click', () => {
                    currentKey = m.getAttribute('data-key');
                    let Div = document.querySelector(`div[data-taskid='${m.getAttribute('data-key')}']`);
                    fillForm(Div);
                    document.querySelector('#pAdd').style.display = 'none';
                    document.querySelector('#pupdate').style.display = 'block';    
                    let YPOS = document.querySelector('#todo-form').getBoundingClientRect().top;
                    window.ScrollTo(0, YPOS);
                                    
                });

            }

        }
            
    document.querySelector('.close').addEventListener('click', ()=> {
        document.querySelector('#Popup').style.display = "none";
    })
        //})
        let TodoObj = new Object();
        function fillForm(dataKey){
            document.querySelector('#txtHeading').value = dataKey.querySelector('.todo-title').textContent;
                document.querySelector('#txtDate').value = dataKey.querySelector('.todo-date').textContent.trim();
               document.querySelector('#txtTime').value  =  dataKey.querySelector('.todo-time').textContent.trim();
            
              // let dDate =new Date(dataKey.querySelector('.todo-time').textContent).toDateString('');
                document.querySelector('#txtDetails').value = dataKey.querySelector('.todo-details').textContent; 
        }

        function collapseList(listID, ctrlBtn){
            document.querySelector(listID).style.display = 'none';
            document.querySelector(listID).innerHTML = '';
               document.querySelector(ctrlBtn).classList.remove('fa-minus');
               document.querySelector(ctrlBtn).classList.add('fa-expand');
               document.querySelector(`#btn2m`).innerHTML = '&plus;'
                document.querySelector(`#btn2m`).setAttribute('title', 'Expand list');
        }
        function expandList(listID, ctrlBtn){
           // if (localStorage.hasItems)
            fetchItems(listID);
            initButtons();
            document.querySelector(listID).style.display = 'block';
            document.querySelector(ctrlBtn).classList.remove('fa-expand');
            document.querySelector(ctrlBtn).classList.add('fa-minus');
            document.querySelector(`#btn2m`).innerHTML = '&minus;'
            document.querySelector(`#btn2m`).setAttribute('title', 'collapse list');
     } 
        let btn2m = document.querySelector('#btn2m').addEventListener('click', () => {
            if(document.querySelector('#btn2m').className.includes('fa-expand')){
               expandList('#tasks-2m', "#btn2m"); 
              }
           else{ collapseList('#tasks-2m', "#btn2m"); }
        });

            function fetchItems(tasksListID){
                  for (els of Object.keys(localStorage)){
                    elContent = JSON.parse(localStorage.getItem(els));
                    let con1 =  `<div class='todo-item' data-taskID='${els}'> <h3 class='todo-title'> ${elContent.Title} </h3>`+
                    `<strong> Date: </strong>  <span class='todo-date'>  ${elContent.Date} </span> <strong>Time: </strong>`+ 
                    `<span  class='todo-time'> ${elContent.Time} </span>`;

                    con2 = `<p><strong>Details: </strong> <span class='todo-details'>`+
                    `${elContent.Details} </span><p> <br /> <hr /> <br />  `+
                    `<button class='btnDelete' data-key='${els}'> Delete </button> <button class='btnEdit' data-key='${els}'>`+
                    `Edit </button> </div>`; 
                    document.querySelector(tasksListID).innerHTML += con1 + con2 ;
                    
                }

            }
            function  AddToDo(TodoObj){
                console.log('adding Objs')
                    let storageNum = `Todo-${genID(localStorage.length+1)}`;
                 localStorage.setItem(storageNum, JSON.stringify(TodoObj));
               
                 
            }
            let btnUpdate = document.querySelector('#btnUp').addEventListener('click', ()=> {
                    updateTodo(getInputs(), currentKey);
                    document.querySelector('.placeholder').innerHTML = 'Updated !';
                document.querySelector('.Popup-content').style.backgroundColor = '#cccccc';
                document.querySelector('#Popup').style.display = 'block';
                btnUpdate.style.display = 'none';
                document.querySelector('#pAdd').style.display = 'block';                
            });
            function getInputs(){
                TodoObj.Title = document.querySelector('#txtHeading').value;
                TodoObj.Date = document.querySelector('#txtDate').value;
                TodoObj.Time = document.querySelector('#txtTime').value;
                TodoObj.Details = document.querySelector('#txtDetails').value;
                console.log('returing Objs');
                return TodoObj;
            }
            let btnAdd = document.querySelector('#btnAdd').addEventListener('click', () => {
            
                if(document.querySelector('form').checkValidity()){
                    AddToDo(getInputs()); 
                    document.querySelector('.placeholder').innerHTML = 'Added to the Todo-list !';
                    document.querySelector('.Popup-content').style.backgroundColor = 'green';
                    document.querySelector('#Popup').style.display = 'block';
                    
                 }    
            }); 
            function updateTodo(TodoObj, dataKey){
                      
                 localStorage.setItem(dataKey, JSON.stringify(TodoObj));
                 

            }

        /* function validateInputs(textBox, pattern){

        } */
        let btnAuto = document.querySelector('#btnAuto').addEventListener('click', () => {
                document.querySelector('#txtHeading').value = 'Random Heading';
                document.querySelector('#txtDate').value = '1991-02-12';
                document.querySelector('#txtTime').value = '02:05';
                document.querySelector('#txtDetails').value = 'SOME RANDOM VALUES';
        })
        
        function genID(ID){
            if(! (localStorage.getItem("Todo-"+ID ) == null)){
                
                return genID(++ID);
            }
            else {
               return ID;
                
            }
        }
