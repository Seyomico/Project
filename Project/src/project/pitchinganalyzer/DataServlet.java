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

@WebServlet("/project/pitchinganalyzer/data")
public class DataServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
		ServletContext context = this.getServletContext();
		GameData gameData = (GameData) context.getAttribute("GameData");
		if (gameData == null) {
			gameData = new GameData();
			context.setAttribute("GameData", gameData);
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		GameData gameData = new GameData();

		String userName = request.getParameter("loginUser");
		String pitcherName = request.getParameter("pitcherName");
		int selectNumber = gameData.getGameNumber(userName, pitcherName);

		StringBuilder builder = new StringBuilder();
		builder.append(selectNumber);
		String json = builder.toString();

		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		writer.append(json);
		writer.flush();

}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		GameData gameData = new GameData();

		String userName = request.getParameter("loginUser");
		String pitcherName = request.getParameter("pitcherName");
		int selectNumber = Integer.parseInt(request.getParameter("selectNumber"));
		List<String[]> datas = gameData.getGameData(userName, pitcherName, selectNumber);

		String[] state = datas.get(0);
		String[] pitching;

		StringBuilder builder = new StringBuilder();
		builder.append('{');
		builder.append("\"state\":");
		builder.append("[");
		for(int i = 1; i < state.length - 1; i++){
			builder.append("\"").append(state[i]).append("\",");
		}
		builder.append("\"").append(state[state.length - 1]).append("\"],");

		for(int j = 1; j < datas.size();j++){
			pitching = datas.get(j);
		 	builder.append("\"throwcount").append(j).append("\":");
		 	builder.append("[");
		 	for(int k = 0; k < pitching.length - 1; k++){
		 		builder.append("\"").append(pitching[k]).append("\",");
		 	}
		 	builder.append("\"").append(pitching[pitching.length - 1]).append("\"],");
		}
		builder.deleteCharAt(builder.length()-1);


	builder.append("}");

	String json = builder.toString();
	response.setContentType("application/json");
	PrintWriter writer = response.getWriter();
	writer.append(json);
	writer.flush();
}

}
