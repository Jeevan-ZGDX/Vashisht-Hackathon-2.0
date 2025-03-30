async function handler({ email, hairType, hairGoal, scalpCondition }) {
  try {
    await sql`
      INSERT INTO quiz_responses 
      (email, hair_type, hair_goal, scalp_condition)
      VALUES
      (${email}, ${hairType}, ${hairGoal}, ${scalpCondition})
    `;

    return {
      success: true,
      message: "Quiz response saved successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to save quiz response",
    };
  }
}
