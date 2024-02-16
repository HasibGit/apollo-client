import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  rates: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    // this.addRecipe('mutton teheri', 'very tasty 😋');

    this.getAllRecipes();

    // this.getRecipe();

    //this.editRecipe('65cd07d614cb755a158ec4b6', 'Beef Khicuri', 'Pretty good');

    // this.deleteRecipe();
  }

  addRecipe(name: string, description: string) {
    this.apollo
      .mutate({
        mutation: gql`
          mutation Mutation($recipeInput: RecipeInput) {
            createRecipe(recipeInput: $recipeInput) {
              createdAt
              description
              name
              thumbsDown
              thumbsUp
            }
          }
        `,
        variables: {
          recipeInput: {
            name: name,
            description: description,
          },
        },
      })
      .subscribe((res) => console.log(res));
  }

  editRecipe(id: string, name: string, description: string) {
    this.apollo
      .mutate({
        mutation: gql`
          mutation EditRecipe($id: ID!, $recipeInput: RecipeInput) {
            editRecipe(ID: $id, recipeInput: $recipeInput)
          }
        `,
        variables: {
          id: id,
          recipeInput: {
            description: description,
            name: name,
          },
        },
      })
      .subscribe((res) => console.log(res));
  }

  getAllRecipes() {
    this.apollo
      .watchQuery({
        query: gql`
          query GetRecipes($amount: Int) {
            getRecipes(amount: $amount) {
              createdAt
              description
              name
              thumbsDown
              thumbsUp
            }
          }
        `,
        variables: {
          amount: 10, // Specify the amount you want to retrieve
        },
      })
      .valueChanges.subscribe((res) => console.log(res));
  }

  getRecipe() {
    this.apollo
      .watchQuery({
        query: gql`
          query Recipe($id: ID!) {
            recipe(ID: $id) {
              createdAt
              description
              name
              thumbsDown
              thumbsUp
            }
          }
        `,
        variables: {
          id: '65cd07d614cb755a158ec4b6',
        },
      })
      .valueChanges.subscribe((res) => console.log(res));
  }

  deleteRecipe() {
    this.apollo
      .mutate({
        mutation: gql`
          mutation Mutation($deleteRecipeId2: ID!) {
            deleteRecipe(ID: $deleteRecipeId2)
          }
        `,
        variables: {
          deleteRecipeId2: '65cd07d614cb755a158ec4b6',
        },
      })
      .subscribe((res) => console.log(res));
  }
}
