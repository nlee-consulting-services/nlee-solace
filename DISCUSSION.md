List of Changes 
-
General:
* Reorganized the project a little to have advocate section and components - Ran out of time moving everything around though
* Added test folder to use mock data and have a test on db connection
* Added jest framework for testing
* package.json updates

DB Directory
- 
* Changed to singleton pattern to prevent multiple instances of db
* Changed to throw exception immediately if config issues
* Code changes made easier to write test against

Advocates Directory
-
* Created to eventually move Page.tsx to be its own module that could be resued but ran out of time 
* Put styles for table in AdvocateTable.module.css for now

API Directory
- 
* Updated pattern to leverage singleton db
* Changed response to use NextResponse

Components Directory
-
* Created to house AdvocateCard row component and any others in future

Page.tsx
-
* Fixed missing <tr> tags in thead that was causing hydration error initially
* Added Advocate Id to table rows as key for any lookups or easier manipulation
* Switched to state-driven rendering to not use document.getElementById(), should use useState
* Made searching case-insensitive and updated to handle null/undefined
* Added error catching around api retrieval
* Changed filter map to normalize search terms to lower case
* Changed filter map to change years to string for comparison
* Changed filter map to better search specialties
* Changed reset to clear input box
* Added Sort by box which leverages lodash to sort, defaulting to asc

Other Possible changes if more time
- 
* Todo: Add more test
* Separate out env files for int/stg/prd.
* Maybe look more into configs and see if any setting optimizations
* Move Advocate table into own component that then leverages AdvocateCard component
* Maybe play with the table css a little bit more
* Add paging to the Get call, since only like 12 records or so its ok to not have, but if there were millions of records, 
then paging would make sense for performance.  
* Adding a cache layer


