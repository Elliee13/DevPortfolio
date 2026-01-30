# Projects Data Customization Guide

## How to Update Your Projects

All your project information is stored in `src/data/projects.js`. This file contains an array of project objects that you can easily customize.

### Project Object Structure

Each project has the following properties:

```javascript
{
  id: 1,                          // Unique identifier (number)
  title: 'Project Name',          // Project title (string)
  category: 'Web Application',    // Category type (string)
  description: 'Project description...', // Detailed description (string)
  tags: ['React', 'Node.js'],     // Array of technology/tool tags
  year: '2024',                   // Year completed (string, optional)
  client: 'Client Name',          // Client name (string, optional)
  link: '#',                      // Project URL (string)
  featured: true,                  // Highlight this project (boolean)
}
```

### Quick Start

1. **Open** `src/data/projects.js`
2. **Replace** the placeholder content with your actual projects
3. **Save** the file - changes will appear automatically

### Example: Adding Your Own Project

```javascript
{
  id: 7,
  title: 'My Awesome Project',
  category: 'Web Application',
  description: 'A detailed description of what this project does, the challenges faced, and the solutions implemented.',
  tags: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  year: '2024',
  client: 'Client Name',
  link: 'https://your-project-url.com',
  featured: true,
}
```

### Available Categories

You can use any category name, but common ones include:
- `Web Application`
- `UI/UX Case Study`
- `Graphic Design`
- `Brand Identity`
- `Mobile App`
- `E-Commerce`
- `SaaS Platform`

### Tips

- **Featured Projects**: Set `featured: true` to add a subtle border highlight
- **Links**: Replace `'#'` with your actual project URL
- **Tags**: Use relevant technologies, tools, or skills
- **Description**: Write 1-2 sentences describing the project
- **Order**: Projects appear in the order they're listed in the array

### Removing Projects

Simply delete the project object from the array, or comment it out:

```javascript
// {
//   id: 6,
//   title: 'Old Project',
//   ...
// },
```

### Adding More Projects

Just add a new object to the `projects` array with a unique `id` number.
