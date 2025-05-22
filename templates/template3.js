module.exports = function generateTemplate3(cv) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Georgia, serif;
            padding: 40px;
            color: #222;
            background: #f8f8f8;
            line-height: 1.6;
          }
          h1 {
            font-size: 32px;
            border-bottom: 2px solid #444;
            margin-bottom: 10px;
            padding-bottom: 6px;
          }
          h2 {
            font-size: 20px;
            margin: 25px 0 10px;
            color: #333;
            border-bottom: 1px solid #ccc;
            padding-bottom: 4px;
          }
          p {
            margin: 4px 0;
          }
          .section {
            margin-bottom: 20px;
          }
          .project-title {
            font-weight: bold;
            display: block;
            margin-top: 8px;
          }
        </style>
      </head>
      <body>
        <h1>${cv.basicDetails.name || 'Your Name'}</h1>
        <p>Email: ${cv.basicDetails.email || ''}</p>
        <p>Phone: ${cv.basicDetails.phone || ''}</p>
        <p>${[cv.basicDetails.address, cv.basicDetails.city, cv.basicDetails.state, cv.basicDetails.pincode].filter(Boolean).join(', ')}</p>

        ${cv.basicDetails.intro ? `<div class="section"><p>${cv.basicDetails.intro}</p></div>` : ''}

        ${cv.education?.length ? `
          <div class="section">
            <h2>Education</h2>
            ${cv.education.map(e => `
              <p>
                <strong>${e.degree}</strong>, ${e.institution} 
                ${e.percentage ? `- ${e.percentage}%` : ''} 
                ${e.year ? `(${e.year})` : ''}
              </p>
            `).join('')}
          </div>` : ''}

        ${cv.experience?.length ? `
          <div class="section">
            <h2>Experience</h2>
            ${cv.experience.map(e => `
              <p>
                <strong>${e.position}</strong> at ${e.organization} 
                (${e.joiningDate} - ${e.leavingDate || 'Present'})
              </p>
              ${e.location ? `<p>Location: ${e.location}</p>` : ''}
              ${e.ctc ? `<p>CTC: ${e.ctc}</p>` : ''}
              ${e.technologies ? `<p>Technologies: ${e.technologies}</p>` : ''}
            `).join('')}
          </div>` : ''}

        ${cv.skills?.length ? `
          <div class="section">
            <h2>Skills</h2>
            <p>${cv.skills.map(s => s.name).join(', ')}</p>
          </div>` : ''}

        ${cv.projects?.length ? `
          <div class="section">
            <h2>Projects</h2>
            ${cv.projects.map(p => `
              <p>
                <span class="project-title">${p.title}</span>
                ${p.teamSize || p.duration ? `<span>Team Size: ${p.teamSize || '-'}, Duration: ${p.duration || '-'}</span><br/>` : ''}
                ${p.technologies ? `<span>Technologies: ${p.technologies}</span><br/>` : ''}
                ${p.description ? `<span>${p.description}</span>` : ''}
              </p>
            `).join('')}
          </div>` : ''}

        ${cv.socialProfiles?.length ? `
          <div class="section">
            <h2>Social Profiles</h2>
            ${cv.socialProfiles.map(p => `<p><a href="${p.link}" target="_blank">${p.link}</a></p>`).join('')}
          </div>` : ''}
      </body>
    </html>
  `;
}
