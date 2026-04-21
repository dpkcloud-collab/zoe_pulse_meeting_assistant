MOM_PROMPT_TEMPLATE = """
You are an expert executive assistant. Analyze the following meeting transcript and generate a highly structured Minutes of Meeting (MoM) in JSON format. 

Extract the following:
1. "summary": A brief 2-3 sentence overview of the meeting.
2. "action_items": A list of tasks assigned, including the assignee if mentioned.
3. "decisions": Key decisions made during the meeting.

Transcript:
{transcript}
"""