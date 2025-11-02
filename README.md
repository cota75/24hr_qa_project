24 HR QA Take-Home
============

How to run the playwright automation (Web App and API)

1. Go to ./tests/parabank/playwright
2. npm init playwright@latest (if not already installed)
3. npx playwright test 

Timing 
======
| Task | Timing (mins) | Notes |
| :------- | :------: | -------: |
| Test Strategy  | 135  |  |
| Traceability Matrix  | 60  |   |
| Playwright Automation | 180 |30 minutes to refactor postman since newman wasn’t working for what I needed it for| 
| Postman Automation | 90 | Couldn't get newman to work with my variables that were passed between tests. Had to refactor to Playwright| 
|Agent Evaluation Suite|270 | Coming up with prompts and feeding into the AI agents and evaluating results| 	
| Lightweight Perf/Resilience Plan	| 60|	
| Total | 795| 

Assumptions 
======
Used parabank.parasoft.com for both web ui and api test

Trade-offs
======
-  Did not have delete in the parabank.parasoft.com API, so used regres.in 
