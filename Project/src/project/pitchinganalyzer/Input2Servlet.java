package project.pitchinganalyzer;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.List;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

@WebServlet("/project/pitchinganalyzer/input2")
public class Input2Servlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
		ServletContext context = this.getServletContext();
		Pitching pitching = (Pitching) context.getAttribute("Pitching");
		if (pitching == null) {
			pitching = new Pitching();
			context.setAttribute("Pitchihng", pitching);
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		Pitcher pitcher = new Pitcher();

		String userName = request.getParameter("loginUser");
		String pitcherName = request.getParameter("pitcherName");
		List<String> varieties = pitcher.getPitcherVariety(pitcherName);
		System.out.println(userName);

		StringBuilder builder = new StringBuilder();

		builder.append('{');
		builder.append("\"message\":");
		builder.append("[");

		for(int i = 0; i < varieties.size() - 1; i++)
		builder.append("\"").append(varieties.get(i)).append("\",");

		builder.append("\"").append(varieties.get(varieties.size() - 1)).append("\"]");
		builder.append("}");
		String json = builder.toString();

		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		writer.append(json);
		writer.flush();

}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		Pitching pitching = new Pitching();

		String data = request.getParameter("send_data");

		JSONObject jsonObject = new JSONObject(data);

		String userName = jsonObject.getString("userName");
		String pitcherName = jsonObject.getString("pitcherName");
		int throwcount = Integer.parseInt(jsonObject.getString("throwcount"));
		String variety = jsonObject.getString("variety");
		int speed = Integer.parseInt(jsonObject.getString("speed"));
		String result = jsonObject.getString("result");
		String finish = jsonObject.getString("finish");
		int xPosition = jsonObject.getInt("xPosition");
		int yPosition = jsonObject.getInt("yPosition");

		pitching.recordGameData(userName, pitcherName, throwcount, variety, speed, result, finish, xPosition, yPosition);

		String json;

		StringBuilder builder = new StringBuilder();
		builder.append("true");
		json = builder.toString();
		System.out.println(json);

	response.setContentType("application/json");
	PrintWriter writer = response.getWriter();
	writer.append(json);
	writer.flush();
}

}
