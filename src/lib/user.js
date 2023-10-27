export class User {
    constructor({ bio, name, hobbies, links, projects, skills }) {
        this.bio = bio;
        this.name = name;
        this.hobbies = hobbies;
        this.links = links;
        this.projects = projects.sort((a, b) => a.name.localeCompare(b.name));
        this.skills = skills;
    }
}

export const DEFAULT_USER = new User({
    bio: "I'm a Full Stack Developer. I use various frameworks to build advanced applications. I'm experienced with Agile methodologies, which help to manage projects efficiently. I'm skilled in multiple programming languages and always strive to create dynamic and user-friendly digital experiences.",
    name: "Onome Israel Agwa",
    hobbies: [],
    links: [
        {
            name: "github",
            href: "https://github.com/eikcalb",
        },
        {
            name: "email",
            href: `mailto:${process.env.REACT_APP_EMAIL}`,
        },
    ],
    projects: [
        {
            name: "Cortex Player",
            description: `Cortex Player is a versatile media player known for its user-friendly interface, robust codec support, and cross-platform compatibility. It seamlessly handles various media types and allows for customization. Users can enjoy static and programmable content, meeting diverse multimedia needs. The system features a Go-powered WebSocket server and leverages AWS for distributed tasks using Redis and Celery. The repository contains tools in multiple languages, with a preference for Golang, and C++ is used for performance-critical projects. This combination ensures top-notch performance and flexibility for media consumption.`,
            icon: `${process.env.PUBLIC_URL}/asset/cortex1.gif`,
            link: "https://help.vistarmedia.com/hc/en-us/categories/203631587-Cortex",
            teamSize: "10 - 12",
            experimental: false,
        },
        {
            name: "Ingenius Connector",
            description: `InGenius Connector seamlessly integrates telephony systems with CRMs like SalesForce, MSCRM, and ServiceNow, along with telephony providers like Genesys Cloud, Twilio, Avaya, and Cisco. The system includes an Angular-based Admin app and harnesses AWS services for optimal performance. In addition, InGenius offers the InGenius Connect Enterprise, an on-premise server that enhances call center operations by linking telephony systems with leading CRMs and telephony providers, ensuring efficient access to customer data during calls.`,
            icon: `${process.env.PUBLIC_URL}/asset/ingenius.png`,
            link: "https://uplandsoftware.com/ingenius/?utm_source=google&utm_medium=ppc&utm_campaign=ccp_ig_all_search_brand&utm_term=ingenius&gclid=CjwKCAjwnOipBhBQEiwACyGLuvHmEMrG3R0y2WuD9B_oU6D6k35HRwR3qixUIVZYCVXqxEwTjoJeexoCUSUQAvD_BwE",
            teamSize: "30 - 40",
            experimental: false,
        },
        {
            name: "Gigchasers",
            description: `As the lead architect, I spearheaded the creation of Gigchasers, a mobile employment app that bridges the gap between service requesters and providers. Designed to connect customers with entrepreneurs and business owners of all sizes, it ensures a level playing field for small, medium, and large businesses. Gigchasers simplifies the process of finding and connecting with service providers, fostering efficient business interactions that benefit both sides.`,
            icon: `${process.env.PUBLIC_URL}/asset/gigchasers.png`,
            link: "https://gigchasers.com/",
            teamSize: "N/A",
            experimental: false,
        },
        {
            name: "ChalkTalk",
            description: `ChalkTalk is a software for creating dynamic and interactive educational content. It's often used to develop digital lessons, tutorials, and educational materials in a visual and interactive format. ChalkTalk allows users to create drawings, animations, and simulations to convey complex concepts in a more engaging and accessible way. It's a valuable tool for educators, especially in STEM fields, to enhance the learning experience for students.`,
            icon: `${process.env.PUBLIC_URL}/asset/chalktalk.png`,
            link: "https://chalktalk.com/",
            teamSize: "<50",
            experimental: false,
        },

        // Personal projects
        {
            name: "eikcalb.dev",
            description: `This is my personal homepage which will continue to be developed and will be the victim for any web technology I intend investigating. I have created an easter egg inside. Tap the page 4 times to toggle this feature.`,
            icon: `${process.env.PUBLIC_URL}/asset/homepage.png`,
            link: "https://eikcalb.dev/",
            experimental: true,
        },
        {
            name: "Local",
            description: `Local is a server application for fleet management. This software includes a mobile application that serves as clients for the server API. Users can authenticate themselves through a master password and facial recognition. The application is built using Electron, providing a seamless and efficient solution for fleet management.`,
            icon: `${process.env.PUBLIC_URL}/asset/local.png`,
            link: "https://github.com/eikcalb/local-desktop",
            experimental: true,
        },
        {
            name: "MetricsFetcher",
            description: `This software is designed to monitor Windows computers for various metrics, utilizing the PQH API. The application collects real-time data on system performance, resource usage, and other relevant metrics. This data is then elegantly displayed to provide insights into computer health and performance. One notable feature is the integration of a JavaScript engine, allowing users to define and collect custom metrics to meet specific monitoring needs. The collected custom metrics are efficiently stored in an SQLite database, streamlining data management and accessibility. This software offers a holistic solution for in-depth system monitoring and custom metric tracking on Windows computers.`,
            icon: ``,
            link: "https://github.com/eikcalb/metricsfetcher",
            experimental: true,
        },
        {
            name: "Prime Counter",
            description: `This website showcases the potential of WebAssembly and Golang in solving complex mathematical problems on the web. It leverages WebAssembly and Golang to generate and display prime numbers in a user-friendly table, offering an efficient and high-performance solution for mathematical computations on the web.`,
            icon: `${process.env.PUBLIC_URL}/asset/prime.png`,
            link: "https://eikcalb.github.io/prime-counter/",
            experimental: true,
        },
        {
            name: "Fiber",
            description: `Utilizing the GitHub API, this website allows users to explore GitHub's vast community, to discover users, and access valuable information about users and their repositories.`,
            icon: `${process.env.PUBLIC_URL}/asset/fiber.png`,
            link: "https://eikcalb.github.io/fiberweb/",
            experimental: true,
        },
        {
            name: "FileFilter",
            description: `FileFilter is a command-line tool written in Go, designed for efficient and precise filtering of Excel tables. This tool simplifies the process of extracting specific data from Excel spreadsheets by focusing on a designated column and allowing users to define filtering criteria.`,
            link: "https://github.com/eikcalb/file-filter",
            experimental: true,
        },
        {
            name: "VOD",
            description: `VOD is a command-line tool crafted in Go, specifically designed for the compression of video files and the generation of thumbnails. Its primary purpose is to serve as an integral component in AWS workflows, responding to triggers in an S3 bucket. When files are added to the bucket, VOD efficiently processes and compresses video content while creating accompanying thumbnails. This versatile tool ensures optimal handling of media assets, making it a valuable asset for AWS-based video processing and management.`,
            link: "https://github.com/eikcalb/vod",
            experimental: true,
        },
        {
            name: "KeyPairGen",
            description: `Keypairgen is a Go-powered utility designed for the generation of keypairs. It simplifies the process of creating cryptographic keypairs, making it a valuable resource for security and encryption-related tasks. This tool offers a straightforward solution for generating keys, enhancing data protection and security measures.`,
            link: "https://github.com/eikcalb/keypairgen",
            experimental: true,
        },
    ],
    skills: [
        { name: "Angular" },
        { name: "AWS" },
        { name: "Azure" },
        { name: "Bazel" },
        { name: "C++" },
        { name: "C#" },
        { name: "Celery" },
        { name: "Docker" },
        { name: "Firebase" },
        { name: "D3.js" },
        { name: "Google Cloud Platform" },
        { name: "GraphQL" },
        { name: "Golang" },
        { name: "JavaScript" },
        { name: "Jenkins" },
        { name: "MongoDB" },
        { name: "PostgreSQL" },
        { name: "Python" },
        { name: "React" },
        { name: "React Native" },
        { name: "SQLite" },
        { name: "Tailwind CSS" },
        { name: "TeamCity" },
        { name: "TensorFlow" },
        { name: "TypeScript" },
    ],
});
