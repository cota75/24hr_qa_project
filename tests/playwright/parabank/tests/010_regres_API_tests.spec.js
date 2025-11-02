import { test, expect  } from '@playwright/test';

test('Get users from https://regres.in', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users', {
    headers: {
      'X-Api-Key': 'reqres-free-v1'
      //'Accept': 'application/json'
    }
  });

  expect(response.ok()).toBeTruthy();
  console.log(await response.text());
});

test('Delete users from https://regres.in', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2', {
      headers: {
        'X-Api-Key': 'reqres-free-v1'
        //'Accept': 'application/json'
      }
  });

  expect(response.ok()).toBeTruthy();

});

test('Check if user is deleted ', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2', {
    headers: {
      'X-Api-Key': 'reqres-free-v1'
      //'Accept': 'application/json'
    }
  });

  expect(response.ok()).toBeTruthy();


});