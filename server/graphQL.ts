export function discussionGraphQL(
  githubDiscussionCategoryId: string | undefined
) {
  return `{
        repository(name: "KaBlog", owner: "luutrananhkhoa") {
            discussions(first: 100, categoryId: "${githubDiscussionCategoryId}") {
                nodes {
                    title
                    url
                    number
                    bodyHTML
                    bodyText
                    createdAt
                    lastEditedAt
                    author {
                        login
                        url
                        avatarUrl
                    }
                    labels(first: 100) {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    }`
}

// Single post
export function discussionDetailGql(postId: number | undefined) {
    return `{
      repository(owner: "luutrananhkhoa", name: "KaBlog") {
        discussion(number: ${postId}) {
          title
          bodyHTML
          createdAt
          author {
            login
            url
            avatarUrl
          }
        }
      }
    }`
  }