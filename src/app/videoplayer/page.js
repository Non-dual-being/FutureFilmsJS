"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FutureFilmsPage() {
  const THEMES = [
    'Mobiliteit', 
    'Energietransitie', 
    'Klimaatverandering',
    'Watermanagement',
    'Grondstoffen', 
    'Voedselinnovatie', 
    'Biodiversiteit',
    'InternetofThings'
  ];

  const LEVELS = ['1', '2', '3'];
  const MAX_SELECTION = 8;

  const beschikbareVideos = {
    "Mobiliteit": {
        "1": [
            "Mobiliteit_1_1.mp4",
            "Mobiliteit_1_2.mp4",
            "Mobiliteit_1_3.mp4",
            "Mobiliteit_1_4.mp4",
            "Mobiliteit_1_5.mp4",
        ]
        
    },
    "Energietransitie": {
        "1": [
            "Energietransitie_1_1.mp4",
            "Energietransitie_1_2.mp4",
            "Energietransitie_1_3.mp4",
            "Energietransitie_1_4.mp4",
            "Energietransitie_1_5.mp4",
        ]
    },
    "Klimaatverandering": {
        "1": [
            "Klimaatverandering_1_1.mp4",
            "Klimaatverandering_1_2.mp4",
            "Klimaatverandering_1_3.mp4",
            "Klimaatverandering_1_4.mp4",
            "Klimaatverandering_1_5.mp4",
        ],
        // Herhaal voor niveau 2 en 3
    },
    "Watermanagement": {
        "1": [
            "Watermanagement_1_1.mp4",
            "Watermanagement_1_2.mp4",
            "Watermanagement_1_3.mp4",
            "Watermanagement_1_4.mp4",
            "Watermanagement_1_5.mp4",
        ],
        // Herhaal voor niveau 2 en 3
    },
    "Grondstoffen": {
        "1": [
            "Grondstoffen_1_1.mp4",
            "Grondstoffen_1_2.mp4",
            "Grondstoffen_1_3.mp4",
            "Grondstoffen_1_4.mp4",
            "Grondstoffen_1_5.mp4",
        ],
        // Herhaal voor niveau 2 en 3
    },
    "Voedselinnovatie": {
        "1": [
            "Voedselinnovatie_1_1.mp4",
            "Voedselinnovatie_1_2.mp4",
            "Voedselinnovatie_1_3.mp4",
            "Voedselinnovatie_1_4.mp4",
            "Voedselinnovatie_1_5.mp4",
        ],
        // Herhaal voor niveau 2 en 3
    },
    "Biodiversiteit": {
        "1": [
            "Biodiversiteit_1_1.mp4",
            "Biodiversiteit_1_2.mp4",
            "Biodiversiteit_1_3.mp4",
            "Biodiversiteit_1_4.mp4",
            "Biodiversiteit_1_5.mp4",
        ],
        // Herhaal voor niveau 2 en 3
    },
    "InternetofThings": {
        "1": [
            "InternetofThings_1_1.mp4",
            "InternetofThings_1_2.mp4",
            "InternetofThings_1_3.mp4",
            "InternetofThings_1_4.mp4",
            "InternetofThings_1_5.mp4",
        ]
        // Herhaal voor niveau 2 en 3
    },
};

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const isLevelAvailable = (level) => {
    return THEMES.every(theme => 
      beschikbareVideos[theme] && 
      beschikbareVideos[theme][level] && 
      beschikbareVideos[theme][level].length > 0
    );
  };

  const handleLevelToggleChange = (level, isChecked) => {
    console.log(`Level Toggle Changed: Level ${level}, Checked: ${isChecked}`);
    if (updating) return;
    setUpdating(true);

    const updatedCheckboxes = [...selectedCheckboxes];
    THEMES.forEach(theme => {
      const checkboxId = `${theme}${level}`;
      const checkboxIndex = updatedCheckboxes.indexOf(checkboxId);

      if (isChecked && checkboxIndex === -1) {
        updatedCheckboxes.push(checkboxId);
      } else if (!isChecked && checkboxIndex !== -1) {
        updatedCheckboxes.splice(checkboxIndex, 1);
      }

      const checkboxElement = document.getElementById(checkboxId);
      if (checkboxElement && !checkboxElement.disabled) {
        console.log(`Setting ${checkboxId} to ${isChecked}`);
        checkboxElement.checked = isChecked;
      }
    });

    console.log("Updated Checkboxes after toggle:", updatedCheckboxes);
    setSelectedCheckboxes(updatedCheckboxes);
    setUpdating(false);
  };

  useEffect(() => {
    const levelToggles = document.querySelectorAll('.level-toggle');
    levelToggles.forEach(toggle => {
      const level = toggle.dataset.level;
      toggle.addEventListener('change', () => handleLevelToggleChange(level, toggle.checked));
    });

    const allCheckboxes = document.querySelectorAll('input[type="checkbox"][name]');
    allCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        console.log(`Checkbox Changed: ${this.id}, Checked: ${this.checked}`);
        if (updating) return;

        const level = this.value;
        const levelToggle = document.querySelector(`#niv${level}`);
        const allOfLevel = document.querySelectorAll(`input[type='checkbox'][value='${level}']:not(:disabled)`);
        const allChecked = Array.from(allOfLevel).every(cb => cb.checked);
        levelToggle.checked = allChecked;

        handleCheckboxChange({ target: this });
      });
    });

    return () => {
      levelToggles.forEach(toggle => toggle.removeEventListener('change', handleLevelToggleChange));
      allCheckboxes.forEach(checkbox => checkbox.removeEventListener('change', handleCheckboxChange));
    };
  }, [selectedCheckboxes]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    console.log(`Checkbox Handle Change: ${id}, Checked: ${checked}`);
    setSelectedCheckboxes(prev => {
      const newSelected = checked ? [...prev, id] : prev.filter(selectedId => selectedId !== id);
      console.log("Updated Selected Checkboxes:", newSelected);
      return newSelected.length > MAX_SELECTION ? newSelected.slice(1) : newSelected;
    });
  };

  const submitSelection = (e) => {
    e.preventDefault();
    console.log("Submitting Selection:", selectedCheckboxes);
    if (selectedCheckboxes.length === 0) {
      alert('Selecteer ten minste 1 checkbox om de quiz te starten.');
      return;
    }
    localStorage.setItem('selectedThemes', JSON.stringify(selectedCheckboxes));
    router.push('/videospeler');
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/spelbord_future_films.pdf';
    link.download = 'spelbord_future_films.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <header>
        <h1>FutureFilms VideoQuiz</h1>
      </header>
      <div className="center-container">
        <h2>
          <span className="main-text">Selecteer en start de Quiz</span>
          <span className="subtitle">
            Kies 1 voor niveau PO, 2 voor VO onderbouw en 3 voor niveau VO bovenbouw.
          </span>
        </h2>
        <form id="themesForm" onSubmit={submitSelection}>
          <div className="theme-row">
            <label className="themes-label">NiveauSelector</label>
            <div className="level-toggles">
              {LEVELS.map((level) => (
                <div key={level}>
                  <input
                    type="checkbox"
                    id={`niv${level}`}
                    className="level-toggle"
                    data-level={level}
                    disabled={!isLevelAvailable(level)}
                  />
                  <label htmlFor={`niv${level}`}>{level}</label>
                </div>
              ))}
            </div>
          </div>
          {THEMES.map((theme) => (
            <div key={theme} className="theme-row">
              <label>{theme}</label>
              <div className="level-toggles">
                {LEVELS.map((level) => (
                  <React.Fragment key={level}>
                    <input
                      type="checkbox"
                      id={`${theme}${level}`}
                      name={theme}
                      value={level}
                      onChange={handleCheckboxChange}
                      className="enabled-checkbox"
                      disabled={!beschikbareVideos[theme] || !beschikbareVideos[theme][level]}
                    />
                    <label htmlFor={`${theme}${level}`}>{level}</label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </form>
        <button type="submit" id="StartQuizknop">Start Quiz</button>
      </div>
      <button onClick={downloadPDF} id="Downloadknop">
        Download spelbord
      </button>
      <div className="startknop">
        <img src="/Future_Films_website_knop.png" alt="startquiz" />
      </div>
      <footer>
        {/* Add footer icons here */}
      </footer>
    </div>
  );
}
