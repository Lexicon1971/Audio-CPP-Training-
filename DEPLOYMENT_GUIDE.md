# GitHub Pages Deployment Guide

Follow these steps to deploy your application to GitHub Pages.

## 1. Create a New Repository on GitHub

1.  Go to [GitHub](https://github.com) and log in to your account.
2.  In the top-right corner, click the **+** icon and select **New repository**.
3.  Choose a **Repository name**. This will be used in the configuration files.
4.  You can add an optional description.
5.  Choose whether to make the repository **Public** or **Private**. GitHub Pages works with both.
6.  Click **Create repository**.

## 2. Push Your Project to the New Repository

1.  In your local project directory, initialize a new Git repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Add the remote repository you just created on GitHub:
    ```bash
    git remote add origin https://github.com/{github-username}/{repository-name}.git
    ```
    Replace `{github-username}` with your GitHub username and `{repository-name}` with the name of your new repository.
3.  Push your project to the repository:
    ```bash
    git push -u origin main
    ```

## 3. Update Configuration Files

1.  **`package.json`**:
    -   Open the `package.json` file.
    -   Find the `homepage` property.
    -   Replace `{github-username}` with your GitHub username and `{repository-name}` with your repository name.
    -   It should look like this: `"homepage": "https://your-username.github.io/your-repo-name/"`

2.  **`vite.config.ts`**:
    -   Open the `vite.config.ts` file.
    -   Find the `base` property.
    -   Replace `{repository-name}` with your repository name.
    -   It should look like this: `base: '/your-repo-name/'`

3.  Commit and push these changes to your repository:
    ```bash
    git add package.json vite.config.ts
    git commit -m "Update configuration for GitHub Pages"
    git push origin main
    ```

## 4. Deploy the Application

1.  In your local project directory, run the deployment script:
    ```bash
    npm run deploy
    ```
    This will build your application and push the contents of the `dist` directory to a new `gh-pages` branch in your repository.

## 5. Configure GitHub Repository Settings

1.  Go to your repository on GitHub.
2.  Click the **Settings** tab.
3.  In the left sidebar, click **Pages**.
4.  Under **Build and deployment**, for the **Source**, select **Deploy from a branch**.
5.  For the **Branch**, select `gh-pages` and keep the folder as `/ (root)`.
6.  Click **Save**.

Your application should now be live at the URL specified in the `homepage` property of your `package.json` file. It may take a few minutes for the changes to propagate.
