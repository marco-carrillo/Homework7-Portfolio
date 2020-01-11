// Main functionality

//*******************************************************/
// The following function validates an e-mail address
//*******************************************************/

function validateEmail(email) 
{
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return re.test(email);
}


//*******************************************************/
// When button is clicked, this function comes to light
//*******************************************************/

function info_sent(event){
    // Preventing submission of the information until we can figure out if information is valid
    event.preventDefault()

    // Evaluating whether name is blank.  Name has to be at least three characters (as in "Sam", "Tom", etc.)

    let name=$("#contact-name").val();
    name=name.trim();

    if(name.length<3){
        $.confirm({                                                            
            title: "Invalid name",
            content: "Name is invalid.  Please enter a name at least three characters long, spaces not counted",
            type: 'red',
            typeAnimated: true,
            buttons: {
                close: function () {
                }
            }
        });
        return;
    }

    // Evaluating whether the e-mail is invalid

    let email=$("#contact-email").val();
    email=email.trim();

    if(validateEmail(email)===false){
        $.confirm({                                                            
            title: "Invalid email",
            content: "The e-mail is invalid.  Please ensure you are entering a valid e-mail address so that we can proceed",
            type: 'red',
            typeAnimated: true,
            buttons: {
                close: function () {
                }
            }
        });
        return;
    }

    // Finally, evaluating that the message is at least 10 characters long.  We are cool with that

    let message=$("#contact-message").val();
    message=message.trim();

    if(message.length<10){
        $.confirm({                                                            
            title: "Invalid message",
            content: "The message is too short.  Please enter a message that is at least ten characters long",
            type: 'red',
            typeAnimated: true,
            buttons: {
                close: function () {
                }
            }
        });
        return;
    }

    // Now that we have validated the message, we will use the email address to look in local storage.
   //  if local storage is empty, then we will create it

    let contacts=JSON.parse(localStorage.getItem("contacts"));
    if(contacts===null){
        $.confirm({                                                            
            title: "Welcome to our website "+name,
            content: "Thanks for your message, we will be in touch shortly",
            type: 'green',
            typeAnimated: true,
            buttons: {
                close: function () {
                }
            }
        });

        contacts =[{name: name, email: email, message: message}];
        localStorage.setItem("contacts",JSON.stringify(contacts));
        return;
    }

    // Now if the local storage is not empty, it will look for the email
    // If it finds it, it will thank you for contacting us again.  If not, 
    // will display the same message as above.

    let newcontacts =[{name: name, email: email, message: message}];
    let found=contacts.filter(obj=> obj.email===email);
    if(found.length>0){
        $.confirm({                                                            
            title: "Welcome back "+name,
            content: "Thanks for continuing to contact us.  We like to hear from friends.  As usual, we will be in touch shortly",
            type: 'green',
            typeAnimated: true,
            buttons: {
                close: function () {
                }
            }
        });
        contacts.push(newcontacts);
        localStorage.setItem("contacts",JSON.stringify(contacts));
        return;
     }

     // If we got this far, it means that this is a new contact

     $.confirm({                                                            
        title: "Welcome to our website "+name,
        content: "Thanks for your message, we will be in touch shortly",
        type: 'green',
        typeAnimated: true,
        buttons: {
            close: function () {
            }
        }
     });
     contacts.push(newcontacts);
     localStorage.setItem("contacts",JSON.stringify(contacts));
     return;
}

$(document).on("click","#send-message",info_sent);  // Setting click events for prior searches 
