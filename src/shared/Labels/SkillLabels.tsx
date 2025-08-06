import * as React from 'react';
import { JSX } from 'react/jsx-runtime';

type Skilltype = "progLang" | "framework_lib" | "tool_ide" | "os" | "db" | "methodology" | "other";
type SkillList = {
    progLang?: string[];    // Programming languages
    framework_lib?: string[];    // Frameworks and libraries
    tool_ide?: string[];    // Tools and IDEs
    os?: string[];    // Operating systems
    db?: string[];    // Databases
    methodology?: string[];    // Methodologies
    other?: string[];   // Other skills
};

interface SkillLabelProps {
    content: React.ReactNode | SkillList,   // Content to display
    typeLineBreak?: boolean // If true, skill type will be displayed in a column
}

/**
 * Get the style for a specific skill type.
 * @param type - The type of skill to get the style for
 * @returns The CSS properties for the skill type
 */
function getStyleOfSkill(type: Skilltype): React.CSSProperties {
    switch (type) {
        case "progLang":
            return { backgroundColor: '#4CAF50', color: '#fff' }; // Green
        case "framework_lib":
            return { backgroundColor: '#2196F3', color: '#fff' }; // Blue
        case "tool_ide":
            return { backgroundColor: '#FF9800', color: '#fff' }; // Orange
        case "os":
            return { backgroundColor: '#9C27B0', color: '#fff' }; // Purple
        case "db":
            return { backgroundColor: '#A4243B', color: '#fff' }; // Red
        case "methodology":
            return { backgroundColor: '#071E22', color: '#fff' }; // rich black
        case "other":
            return { backgroundColor: '#59594A', color: '#fff' }; // ebony (brown)
        default:
            return {};
    }
}

/**
 * SkillLabel component for displaying a list of skills with appropriate styling.
 * @param content - The content to display
 * @param typeLineBreak - If true, skill type will be displayed in a column
 * @returns JSX.Element
 */
const SkillLabel = ({ content, typeLineBreak = false }: SkillLabelProps): JSX.Element => {
    function printSkillList(skillList: SkillList) {
        let returnJSX: JSX.Element[] = [];
        for (const [key, stringArr] of Object.entries(skillList)) {
            const keyStyle = getStyleOfSkill(key as Skilltype);
            const skillSpans = stringArr.map((skillString, index) => (
                <span key={key + "-" + index} className={"badge py-2 px-3"} style={keyStyle}>
                    {skillString}
                </span>
            ));

            // If typeLineBreak is true, wrap each skill type in its own div
            if (typeLineBreak) {
                returnJSX.push(
                    <div key={key + "-container"} className="d-flex flex-wrap gap-2 my-2">
                        {skillSpans}
                    </div>
                );
            } else {
                // Otherwise, just add the spans to the array
                returnJSX.push(...skillSpans);
            }
        }

        if (!typeLineBreak) {
            return (
                <div className="d-flex flex-wrap gap-2 my-2">
                    {returnJSX}
                </div>
            );
        }
        return returnJSX;
    }

    return (
        <>
            {typeof content === "object" && content !== null && !React.isValidElement(content)
                ? printSkillList(content as SkillList)
                : content as React.ReactNode
            }
        </>
    );
};

export default SkillLabel;
