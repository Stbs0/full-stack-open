```mermaid
sequenceDiagram
actor user
participant browser
participant server
user->>+browser: new note input
browser->>+server: Post https://studies.cs.helsinki.fi/exampleappnew_note_spa
browser-->>user: show new page with added note
```