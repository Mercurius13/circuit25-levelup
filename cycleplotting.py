import pandas as pd
import plotly.graph_objects as go
import plotly.offline as pyo

# Load the dataset
df = pd.read_csv("FedCycleData071012 (2).csv")

# Filter a specific user (change this as needed)
user_df = df[df["ClientID"] == "nfp8122"]

# Clean and sort
user_df["CycleNumber"] = pd.to_numeric(user_df["CycleNumber"], errors='coerce')
user_df = user_df.sort_values(by="CycleNumber")

# Fields available to plot
fields_to_plot = [
    "LengthofCycle",
    "EstimatedDayofOvulation",
    "LengthofLutealPhase",
    "TotalMensesScore"
]

# Create plot
fig = go.Figure()

# Add traces for each field (only first one visible)
for i, field in enumerate(fields_to_plot):
    fig.add_trace(
        go.Scatter(
            x=user_df["CycleNumber"],
            y=user_df[field],
            mode="lines+markers",
            name=field,
            visible=(i == 0)
        )
    )

# Dropdown to toggle fields
dropdown_buttons = [
    {
        "label": field,
        "method": "update",
        "args": [
            {"visible": [i == j for j in range(len(fields_to_plot))]},
            {"title": f"{field} vs CycleNumber"}
        ]
    }
    for i, field in enumerate(fields_to_plot)
]

# Update layout
fig.update_layout(
    title="Menstrual Cycle Metric vs Cycle Number",
    xaxis_title="Cycle Number",
    yaxis_title="Value",
    updatemenus=[{
        "buttons": dropdown_buttons,
        "direction": "down",
        "showactive": True,
        "x": 1.1,
        "y": 1.15
    }],
    height=500,
    width=900
)

# Save and open in browser
pyo.plot(fig, filename="cycle_plot.html", auto_open=True)
