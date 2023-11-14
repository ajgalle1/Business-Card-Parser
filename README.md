# Business Card Parser

This project accepts user input to simulate data sent from OCR software after it scans a business card. It then attempts to extract just the name, phone number, and email address so that those can be added to a contact list.  These are displayed in red on the browser.   

In this document, I will: 
Identify how the program works. 
Identify potential issues and suggest alternatives
Provide a recommendation on how to move forward

HOW DOES IT WORK?
The script will add an event listener for when the user hits the submit button and then take everything the user typed or pasted into the form.

It will then separate each line of the business card by splitting it at the carriage returns and store these into an array. This also works if the text was cut and pasted.

Next it will attempt to determine what each line is. That is, if it is the name line, the phone number line, or the email address. 

HOW DOES IT KNOW IF THE LINE IS A PHONE NUMBER?
It will iterate over each line and then strip out everything that is not a digit (so no letters, symbols, dashes, etc.) Then, if what is left is greater than 10 digits, it must be a phone number. It will then print the phone number to the answer space. This captures phone numbers that include area codes and even country codes. Only the first phone number is captured, so fax machines are usually discarded, which is the desired behavior. 

CONS: This code ignores incomplete phone numbers on the assumption the user can’t store these in their phone contact list. This can happen if the business card only lists 7 digits. 

HOW DOES IT KNOW IF THE LINE IS AN EMAIL ADDRESS?
It will iterate over all the lines and see which one has an "@", on the presumption that only the line with the email address will have an "@" sign. 

CONS: In the unlikely event a business includes an @ in its name, it will be be mistaken for an email address.  

HOW DOES IT KNOW IF THE LINE IS A NAME?
It iterates over each line and takes the first word.  It then calls an API (that I did not make and do not maintain) and receives a response which, among other things, tells it if the name was recognized as a first name, and how popular the name is. If it is sufficiently mainstream, the program treats this as the name line and confidently believes it is not a business.  This API also includes nicknames.

CON#1: This is the weakest part of the project.   It relies on an API outside of this organization’s control, so trusting the provider is important.  Also, even though it is free and requires no API key today, this could change in the future.  HOWEVER, using an API provided and maintained by someone else frees up developer time and company resources, so the risk may be acceptable. ALTERNATIVES: If desired, we can maintain these lists on site by taking a list of all popular first names and adding them to a JSON file or SQL database. 

CON#2: Calling the API is time consuming and at scale may impair performance. 

CON#3: The assumption that if the first word of the line is a common first name, then this is likely a person’s name field is not always going to be true. For example, a person with a unique first name will be missed.  Also, while business names such as “Bob’s Tennis Shop” will be recognized as businesses, businesses like “Bob Smith’s Tennis Shop” may be misidentified as names. 

SUMMARY: The code passes all provided test cases.  A strategy for identifying which line is the business name and not a person’s name is provening challenging.  The proposed solution offers the customer with an easily maintainable solution that works in the vast majority of cases.  However, it also relies on third parties and has the potential to misidentify some businesses as people’s names.
  
RECOMMEND: Before further development, I would like to brainstorm this further with my coworkers and supervision at the next SCRUM. It may also be useful to reach out to the customer to determine their tolerance for reliance on third parties and the risk of missing a portion of the cards scanned. Their preference may be to move forward as is. 
